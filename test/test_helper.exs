ExUnit.start()
Ecto.Adapters.SQL.Sandbox.mode(ExHub.Repo, :manual)
Mox.defmock(ExHub.RequestMock, for: ExHub.Request)
Mox.defmock(ExHub.ServerMock, for: ExHub.Server)
