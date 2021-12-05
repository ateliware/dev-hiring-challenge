class ReposController < ApplicationController

  before_action :set_repo, only: %i[ show ]

  def index
    @repos = Repo.order(stargazers_count: :desc).limit(5)
  end

  def show; end

  def new
    languages = ['ruby', 'elixir', 'python', 'go', 'kotlin']

    status = true

    languages.each do |language|
      status = false if !ReposController.create(language)
    end

    if status
      flash[:notice] = "Repositórios encontrados com sucesso!"
    else
      flash[:alert] = "Não foi possível recuperar todos os repositórios. Por favor, tente novamente em instantes!"
    end

    redirect_to action: :index
  end

  private

  def self.create(language)
    begin
      found_repo = Repo.search_repo(language)

      @repo = Repo.find_or_initialize_by(github_id: found_repo["items"].first["id"])

      @repo.full_name        = found_repo["items"].first["full_name"]
      @repo.html_url         = found_repo["items"].first["html_url"]
      @repo.description      = found_repo["items"].first["description"]
      @repo.stargazers_count = found_repo["items"].first["stargazers_count"]
      @repo.homepage         = found_repo["items"].first["homepage"]
      @repo.language         = found_repo["items"].first["language"]
      @repo.avatar_url       = found_repo["items"].first["owner"]["avatar_url"]

      @repo.save

      return true
    rescue Exception => e
      return false
    end
  end

  def set_repo
    @repo = Repo.find(params[:id])
  end
end
