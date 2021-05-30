defmodule ExHub.ServerTest do
  use ExHub.DataCase

  alias ExHub.{Repo, Server, Results}
  import Mox

  @language "Elixir"
  @response [
    %{
      description: :description,
      forks: :forks,
      name: :name
    }
  ]

  setup :set_mox_from_context
  setup :verify_on_exit!

  describe "request/1" do
    test "with valid language" do
      # Cleaning the cache
      :sys.replace_state(:server, fn _state -> %{} end)

      expect(ExHub.RequestMock, :get, fn _ -> %{items: @response} end)

      assert {:ok, @response} == Server.request(@language)

      # Server state was properly populated
      server_state = :sys.get_state(:server)
      assert server_state[@language].payload == @response
      assert server_state[@language].inserted_at != nil

      # Language result was stored in the database
      results = Results.query_by_language(@language) |> Repo.one()
      assert results.language == @language
    end

    test "multiple requests hit the GitHub API only once when requesting below the results lifetime" do
      :sys.replace_state(:server, fn _state -> %{} end)

      # The mock is expected to be called only once
      expect(ExHub.RequestMock, :get, 1, fn _ -> %{items: @response} end)


      assert {:ok, _} = Server.request(@language)
      %{@language => %{inserted_at: first_request_datetime_state}} = :sys.get_state(:server)

      %Results{inserted_at: first_request_datetime_db} =
        Results.query_by_language(@language) |> Repo.one()

      assert {:ok, _} = Server.request(@language)
      %{@language => %{inserted_at: second_request_datetime_state}} = :sys.get_state(:server)

      %Results{inserted_at: second_request_datetime_db} =
        Results.query_by_language(@language) |> Repo.one()

      # Asserting that the results did not change
      assert first_request_datetime_state == second_request_datetime_state
      assert first_request_datetime_db == second_request_datetime_db
    end

    test "does not replace the result if the response from Github hasn't changed" do
      :sys.replace_state(:server, fn _state -> %{} end)

      # The mock is expected to be called twice
      expect(ExHub.RequestMock, :get, 2, fn _ -> %{items: @response} end)

      assert {:ok, _} = Server.request(@language)

      # Getting the results
      [result] = Repo.all(Results)

      old_date =
        DateTime.utc_now()
        |> DateTime.add(-3_600, :second)

      :sys.replace_state(:server, fn state ->
        put_in(state, [@language, :inserted_at], old_date)
      end)

      # Asserting that the results did not change
      assert {:ok, _} = Server.request(@language)
      assert [result] == Repo.all(Results)
    end

    test "replaces the result if the response from Github has changed" do
      :sys.replace_state(:server, fn _state -> %{} end)

      other_response = [
        %{
          description: :other_description,
          forks: :forks,
          name: :other_name
        }
      ]

      # The mock is expected to be called twice
      expect(ExHub.RequestMock, :get, 1, fn _ -> %{items: @response} end)
      expect(ExHub.RequestMock, :get, 1, fn _ -> %{items: other_response} end)

      assert {:ok, @response} == Server.request(@language)

      # Getting the first result
      [first_result] = Repo.all(Results)

      old_date =
        DateTime.utc_now()
        |> DateTime.add(-3_600, :second)

      :sys.replace_state(:server, fn state ->
        put_in(state, [@language, :inserted_at], old_date)
      end)

      assert {:ok, other_response} == Server.request(@language)

      # Asserting that the results changed
      [second_result] = Repo.all(Results)
      refute first_result == second_result
    end
  end
end
