defmodule DevChallenge.Helpers.MapHelper do
  def get_index(map, {key, value}) do
    {_item, index} =
      map
      |> Enum.with_index()
      |> Enum.filter(fn {i, _index} -> i[key] == value end)
      |> Enum.at(0)

    index
  end

  def get_index(map, value) do
    {_item, index} =
      map
      |> Enum.with_index()
      |> Enum.filter(fn {i, _index} -> i == value end)
      |> Enum.at(0)

    index
  end
end
