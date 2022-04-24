defmodule DevChallenge do
  require Logger
  alias DevChallenge.Repositories.Featured

  def get_env!(env_name, default \\ nil) do
    exception_message =
      ~s(could not fetch environment variable "#{env_name}" because it is not set)

    case System.fetch_env(env_name) do
      {:ok, env} -> env
      :error when is_nil(default) -> raise ArgumentError, exception_message
      :error -> default
    end
  end

  def log_error(error, reason \\ "Internal server error", status_code \\ 500) do
    Logger.error(%{
      "status_code" => status_code,
      "reason" => reason,
      "error" => error
    })
  end

  defdelegate get_languages(), to: Featured, as: :get_languages
  defdelegate get_repos(language \\ nil), to: Featured, as: :get_repos
  defdelegate store_data(params), to: Featured, as: :store_data
  defdelegate delete_repo(id), to: Featured, as: :delete_repo
end
