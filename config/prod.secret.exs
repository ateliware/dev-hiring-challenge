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

database_host = "ec2-23-20-224-166.compute-1.amazonaws.com"
database_port = String.to_integer(get_env!.("DB_PORT", "5432"))
database_user = "fxusfjlwlvxvkm"
database_password = "89c73c2ce2b21247c00a082f5acf6099c60eefeb26278d5ee4f278713e842d7d"
database_name = "d1jbqcm334osks"

config :dev_challenge, DevChallenge.Repo,
  ssl: true,
  username: database_user,
  password: database_password,
  database: database_name,
  port: database_port,
  hostname: database_host,
  show_sensitive_data_on_connection_error: true,
  pool_size: 5

secret_key_base = "vflfO0WHLjx8tAtBviDMAvE//s+1CslEAiCUmNLLqdHh8uJQBItUqJjax9jI250U"

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
