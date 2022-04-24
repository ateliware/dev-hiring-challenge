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

# Configure your database
database_host = get_env!.("DB_HOST", "db")
database_port = String.to_integer(get_env!.("DB_PORT", "5432"))
database_user = get_env!.("DB_USER", "postgres")
database_password = get_env!.("DB_PASSWORD", "postgres")
database_name = get_env!.("DB_DATABASE", "dev_challenge")

config :dev_challenge, DevChallenge.Repo,
  ssl: true,
  username: database_user,
  password: database_password,
  database: database_name,
  port: database_port,
  hostname: database_host,
  show_sensitive_data_on_connection_error: true,
  pool_size: 5

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with webpack to recompile .js and .css sources.
config :dev_challenge, DevChallengeWeb.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    node: [
      "node_modules/webpack/bin/webpack.js",
      "--mode",
      "development",
      "--watch-stdin",
      cd: Path.expand("../assets", __DIR__)
    ]
  ]

# ## SSL Support
#
# In order to use HTTPS in development, a self-signed
# certificate can be generated by running the following
# Mix task:
#
#     mix phx.gen.cert
#
# Note that this task requires Erlang/OTP 20 or later.
# Run `mix help phx.gen.cert` for more information.
#
# The `http:` config above can be replaced with:
#
#     https: [
#       port: 4001,
#       cipher_suite: :strong,
#       keyfile: "priv/cert/selfsigned_key.pem",
#       certfile: "priv/cert/selfsigned.pem"
#     ],
#
# If desired, both `http:` and `https:` keys can be
# configured to run both http and https servers on
# different ports.

# Watch static and templates for browser reloading.
config :dev_challenge, DevChallengeWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r"priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$",
      ~r"priv/gettext/.*(po)$",
      ~r"lib/dev_challenge_web/(live|views)/.*(ex)$",
      ~r"lib/dev_challenge_web/templates/.*(eex)$"
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime
