defmodule FiveLanguages.DataCase do
  @moduledoc """
  This module defines the setup for tests requiring
  access to the application's data layer.

  You may define functions here to be used as helpers in
  your tests.

  Finally, if the test case interacts with the database,
  we enable the SQL sandbox, so changes done to the database
  are reverted at the end of every test. If you are using
  PostgreSQL, you can even run database tests asynchronously
  by setting `use FiveLanguages.DataCase, async: true`, although
  this option is not recommended for other databases.
  """

  alias FiveLanguages.Repo
  alias FiveLanguages.Search.Repository

  use ExUnit.CaseTemplate

  using do
    quote do
      alias FiveLanguages.Repo

      import Ecto
      import Ecto.Changeset
      import Ecto.Query
      import FiveLanguages.DataCase
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(FiveLanguages.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(FiveLanguages.Repo, {:shared, self()})
    end

    :ok
  end

  @doc """
  A helper that transforms changeset errors into a map of messages.

      assert {:error, changeset} = Accounts.create_user(%{password: "short"})
      assert "password is too short" in errors_on(changeset).password
      assert %{password: ["password is too short"]} = errors_on(changeset)

  """
  def errors_on(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {message, opts} ->
      Regex.replace(~r"%{(\w+)}", message, fn _, key ->
        opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
      end)
    end)
  end

  def search_repositories_success(_) do
    {:ok, %{items: [
      %{
        clone_url: "https://github.com/teste-owner/teste.git",
        created_at: ~N[2010-01-01 00:00:00],
        forks: 1,
        id: 1,
        language: "Teste",
        name: "teste",
        owner: %{
          login: "teste-owner"
        },
        watchers: 1
      }
    ]}}
  end

  def get_repository_success(_, _) do
    {:ok, %{
      name: "teste",
      html_url: "https://github.com/teste-owner/teste.git",
      full_name: "Teste/teste",
      owner: %{
        login: "teste-owner",
        html_url: "https://github.com/teste-owner/teste.git",
        type: "User"
      },
      description: "Teste teste teste",
      language: "Teste",
      forks: 1,
      stargazers_count: 1,
      size: 1,
      default_branch: "main",
      open_issues: 1,
      created_at: ~N[2010-01-01 00:00:00],
      updated_at: ~N[2010-01-01 00:00:00],
      pushed_at: ~N[2010-01-01 00:00:00],
    }}
  end

  def search_repositories_error(_) do
    [
      :error
    ]
  end

  def get_repository_error(_, _) do
    {:error, :not_found}
  end

  def get_repositories(), do: Repo.all(Repository)

  def insert_repositories(times \\ 5) do
    repositories =
      Enum.map(1..times, fn number ->
        %{
          clone_url: "https://github.com/teste-owner/teste.git",
          created_at: ~N[2010-01-01 00:00:00],
          forks: 1,
          git_id: 1,
          language: "Teste_#{number}",
          name: "teste_#{number}",
          owner: "teste-owner-#{number}",
          inserted_at: ~N[2010-01-01 00:00:00],
          updated_at: ~N[2010-01-01 00:00:00],
          watchers: 1
        }
      end)

    Repo.insert_all(Repository, repositories)
  end
end
