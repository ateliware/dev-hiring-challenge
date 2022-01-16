ExUnit.start()
Ecto.Adapters.SQL.Sandbox.mode(Ateliware.Repo, :manual)
Mox.defmock(HttpClientMock, for: Ateliware.Behaviours.HttpClient)
