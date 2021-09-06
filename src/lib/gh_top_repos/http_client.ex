defmodule GhTopRepos.HttpClient do
  @moduledoc """
  Small client aimed to perform HTTP requests.
  on top of Mint.HTTP library.
  """

  alias Mint.HTTP

  def connect(url) do
    HTTP.connect(:http, url, 80)
  end


  def connect(url, :https) do
    HTTP.connect(:https, url, 443)
  end


  def close(conn) do
    HTTP.close(conn)
  end


  def request(conn, method, path, headers \\ [], body \\ nil) do
    {:ok, conn, req_ref} = HTTP.request(conn, method, path, headers, body)

    {:ok, conn, resp_body} = receive_response(conn, req_ref)

    HTTP.close(conn)

    {:ok, resp_body}
  end


  def get(conn, url, headers \\ []), do: request(conn, "GET", url, headers)


  def get_json(conn, url, headers \\ []) do
    {:ok, resp_body} = get(conn, url, [{"content-type", "application/json"} | headers])
    json = Jason.decode!(resp_body, keys: :atoms)
    {:ok, json}
  end


  # recursively receive and parse the response until a :done response
  def receive_response(conn, request_ref, body \\ []) do
    {conn, body, status} =
      receive do
        message ->
          {:ok, conn, mint_responses} = HTTP.stream(conn, message)

          # reduce responses returning a partial body and status
          {body, status} =
            Enum.reduce(mint_responses, {body, :incomplete},
              fn mint_response, {body, _status} ->
                case mint_response do
                  # the :status mint-response doesn't add
                  # anything to the body
                  {:status, ^request_ref, _status_code} ->
                    {body, :incomplete}

                  {:headers, ^request_ref, _headers} ->
                    {body, :incomplete}

                  # the :data mint-response returns a partial
                  # body; append it to the accumulator
                  {:data, ^request_ref, data} ->
                    if data != "" do
                      {[ data | body ], :incomplete}
                    else
                      {body, :incomplete}
                    end

                  # the :done mint-response signifies
                  # the end of the response
                  {:done, ^request_ref} ->
                    {Enum.reverse(body), :complete}
                end
              end)
          {conn, body, status}
        end

    # if the status is complete we can return the accumulated body
    if status == :complete do
      {:ok, conn, body}
    else
      # recursively call to get more messages
      receive_response(conn, request_ref, body)
    end
  end
end
