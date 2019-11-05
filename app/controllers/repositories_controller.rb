class RepositoriesController < ApplicationController
  def index
    language = params[:language].downcase if params[:language]
    if !language
      @repos = Repo.all.limit(100).order('stargazers_count DESC')
    elsif @languages_list.include? language
      @repos = Repo.where('lower(language) = ?', language).limit(100).order('stargazers_count DESC')
    else
      @repos = []
    end
  end

  def show
    @repo = Repo.find(params[:id])
    unless @repo.readme_content
      github_access_token = Rails.configuration.x.github_auth_token
      client = Octokit::Client.new(access_token: github_access_token)
      repo_readme = client.readme @repo[:full_name]
      readme_content = client.get(repo_readme[:download_url])
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
      @repo.readme_content = markdown.render(readme_content.force_encoding('UTF-8'))
      @repo.save
    end
  end

  def fetch_data
    FetchRepoDataJob.perform_later
    respond_to do |format|
      format.html { redirect_to '/', notice: 'Data fetching job started. May take a while...' }
    end
  end

  def clear_data
    Repo.delete_all
    respond_to do |format|
      format.html { redirect_to '/', notice: 'All data cleared.' }
    end
  end

end
