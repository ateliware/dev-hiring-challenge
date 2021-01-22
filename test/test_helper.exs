ExUnit.start()
Ecto.Adapters.SQL.Sandbox.mode(FiveLanguages.Repo, :manual)
Mox.Server.start_link([])
Mox.defmock(FiveLanguages.Git.Adapters.Mock, for: FiveLanguages.Git.Adapter)
