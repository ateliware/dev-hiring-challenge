defmodule ExHub.ResultsTest do
  use ExHub.DataCase

  alias ExHub.Results

  describe "creating changeset" do
    test "with valid params" do
      changeset = Results.changeset(%{language: "Elixir", payload: [%{}]})

      assert changeset.errors == []
    end

    test "with invalid params" do
      changeset = Results.changeset(%{language: "Some Language", payload: :foo})

      assert changeset.errors != []
    end

    test "with missing params" do
      changeset = Results.changeset(%{language: "Some Language"})

      assert changeset.errors != []
    end
  end
end
