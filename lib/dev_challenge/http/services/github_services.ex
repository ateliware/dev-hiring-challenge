defmodule DevChallenge.Services.GithubService do
  alias HTTPoison
  alias DevChallenge.Clients.GithubClient

  @client_get &GithubClient.get/1

  def get_repositories(language, quantity, sort \\ "stars") do
    url = "/search/repositories?q=language:#{language}&per_page=#{quantity}&sort=#{sort}"

    send_request(@client_get, url)
    |> parse_response_body(language)
  end

  # Parsers and Helpers

  defp parse_response_body({:error, _status, reason}, _lang) do
    {:error, reason}
  end

  defp parse_response_body({:ok, %{"items" => repos}}, lang) do
    {:ok,
     repos
     |> Enum.map(&parse_response_body(&1, lang))}
  end

  defp parse_response_body(res, lang) when is_map(res) do
    %{
      avatar_url: res["owner"]["avatar_url"],
      description: res["description"],
      language: lang,
      name: res["full_name"],
      owner_login: res["owner"]["login"],
      stargazers_count: res["stargazers_count"],
      url: res["url"]
    }
  end

  defp send_request(request, url, status_code \\ 200) do
    case request.(url) do
      {:ok, %{body: body, status_code: ^status_code}} ->
        {:ok, body}

      {:ok, %HTTPoison.Response{status_code: ^status_code, body: body}} ->
        {:ok, body}

      {:ok, %HTTPoison.Response{status_code: fault_status_code, body: body}} ->
        process_failure_call(body, fault_status_code)

      {:error, %HTTPoison.Error{reason: reason}} ->
        process_failure_call(reason)
    end
  end

  defp process_failure_call(reason, status_code \\ 401) do
    error = "Github service error"
    DevChallenge.log_error(error, reason, status_code)

    {:error, 401, error}
  end
end
