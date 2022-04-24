# In this file, we load production configuration and secrets
# from environment variables. You can also hardcode secrets,
# although such is generally not recommended and you have to
# remember to add this file to your .gitignore.
use Mix.Config

get_env! = fn env_name, default ->
  case System.fetch_env(env_name) do
    {:ok, env} ->
      env

    :error when is_nil(default) ->
      raise(
        ArgumentError,
        ~s(could not fetch environment variable "#{env_name}" because it is not set)
      )

    :error ->
      default
  end
end

database_host = get_env!.("DB_HOST", "db")
database_port = String.to_integer(get_env!.("DB_PORT", "5432"))
database_user = get_env!.("DB_USER", "postgres")
database_password = get_env!.("DB_PASSWORD", "postgres")
database_name = get_env!.("DB_DATABASE", "dev_challenge")

config :dev_challenge, DevChallenge.Repo,
  ssl: true
  username: database_user,
  password: database_password,
  database: database_name,
  port: database_port,
  hostname: database_host,
  show_sensitive_data_on_connection_error: true,
  pool_size: 5

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

config :dev_challenge, DevChallengeWeb.Endpoint,
  http: [
    port: String.to_integer(System.get_env("PORT") || "4000"),
    transport_options: [socket_opts: [:inet6]]
  ],
  secret_key_base: secret_key_base

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
#     config :dev_challenge, DevChallengeWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.
