defmodule MineTest do
  use ExUnit.Case
  doctest Mine

  test "greets the world" do
    assert Mine.hello() == :world
  end
end
