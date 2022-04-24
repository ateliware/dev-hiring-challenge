defmodule DevChallenge.Clients.GithubClient do
  use HTTPoison.Base
  alias HTTPoison

  def process_response_body(body) do
    body
    |> Jason.decode!()
  end

  def process_request_body(body) do
    body
    |> Jason.encode!()
  end

  def process_request_url(url),
    do: (DevChallenge.get_env!("GITHUB_BASE_URL") <> url)

  def process_request_headers(headers) do
    content_type_header = {"Content-Type", "application/json"}

    [content_type_header | headers]
  end
end
