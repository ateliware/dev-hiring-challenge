class ReposController < ApplicationController

  def index; end

  def new
    languages = ['ruby', 'elixir', 'python', 'go', 'kotlin']

    languages.each do |language|
      found_repo = Repo.search_repo(language)

      repo = Repo.find_or_initialize_by(github_id: found_repo["items"].first["id"])

      repo.github_id        = found_repo["items"].first["id"]
      repo.full_name        = found_repo["items"].first["full_name"]
      repo.html_url         = found_repo["items"].first["html_url"]
      repo.description      = found_repo["items"].first["description"]
      repo.stargazers_count = found_repo["items"].first["stargazers_count"]
      repo.homepage         = found_repo["items"].first["homepage"]
      repo.language         = found_repo["items"].first["language"]

      repo.save!
    end

    redirect_to root_path
  end
end
