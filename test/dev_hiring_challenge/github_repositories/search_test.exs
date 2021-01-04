defmodule DevHiringChallenge.GithubRepositories.SearchTest do
  use ExUnit.Case, async: true
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  alias DevHiringChallenge.GithubRepositories.Search

  test "Search top 5 ruby repositories successfully" do
    use_cassette "search_top_ruby_repos_successfully" do
      assert {:ok,
              [
                [
                  description: "Ruby on Rails",
                  html_url: "https://github.com/rails/rails",
                  language: "Ruby",
                  name: "rails",
                  stargazers_count: 47311
                ],
                [
                  description:
                    ":globe_with_meridians: Jekyll is a blog-aware static site generator in Ruby",
                  html_url: "https://github.com/jekyll/jekyll",
                  language: "Ruby",
                  name: "jekyll",
                  stargazers_count: 41909
                ],
                [
                  description: "A platform for community discussion. Free, open, simple.",
                  html_url: "https://github.com/discourse/discourse",
                  language: "Ruby",
                  name: "discourse",
                  stargazers_count: 32243
                ],
                [
                  description:
                    "🚀 The easiest way to automate building and releasing your iOS and Android apps",
                  html_url: "https://github.com/fastlane/fastlane",
                  language: "Ruby",
                  name: "fastlane",
                  stargazers_count: 30829
                ],
                [
                  description:
                    "Create agents that monitor and act on your behalf.  Your agents are standing by!",
                  html_url: "https://github.com/huginn/huginn",
                  language: "Ruby",
                  name: "huginn",
                  stargazers_count: 30454
                ]
              ]} == Search.call("5", "ruby")
    end
  end
end
