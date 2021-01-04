defmodule DevHiringChallenge.GithubRepositories.BaseTest do
  use ExUnit.Case, async: true
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  alias DevHiringChallenge.GithubRepositories.Base

  describe "Search python repository" do
    test "Request and returns successfully" do
      use_cassette "search_python_repository_successfully" do
        assert {:ok, %{"items" => [%{"name" => "system-design-primer"}]}} =
                 Base.call("?q=language:python&per_page=1")
      end
    end

    test "Request with bad arguments returns bad request" do
      use_cassette "search_python_repository_bad_request" do
        assert {:error, 400} == Base.call("?q=language:python%")
      end
    end

    test "Request with bad path returns unprocessable entity" do
      use_cassette "search_python_repository_unprocessable_entity" do
        assert {:error, 422} == Base.call("/bad_path")
      end
    end

    test "Request without network returns nxdomain error" do
      use_cassette "search_python_repository_network_error" do
        assert {:error, "nxdomain"} == Base.call("?q=language:python&per_page=1")
      end
    end

    test "Request not existent language returns unprocessable entity" do
      use_cassette "search_not_found_repository_error" do
        assert {:error, 422} == Base.call("?q=language:xyz&per_page=1")
      end
    end
  end
end
