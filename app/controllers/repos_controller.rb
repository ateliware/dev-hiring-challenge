class ReposController < ApplicationController

  before_action :set_repo, only: %i[ show destroy ]

  def index
    @repos = Repo.order(stargazers_count: :desc).limit(5)
  end

  def show; end

  def destroy
    @repo.destroy

    redirect_to root_path, notice: "Repositório removido com sucesso!"
  end

  def new
    status = true

    Rails.configuration.programming_languages.each do |language|
      status = false if !ReposController.create_or_update(language)
    end

    if status
      flash[:notice] = "Repositórios encontrados com sucesso!"
    else
      flash[:alert] = "Não foi possível recuperar todos os repositórios. Por favor, tente novamente em instantes!"
    end

    redirect_to action: :index
  end

  private

  def self.create_or_update(language)
    begin
      found_repo = Github::RepoCreator.search_repo(language)

      @repo = Repo.find_or_initialize_by(github_id: found_repo["id"])

      @repo.full_name        = found_repo["full_name"]
      @repo.html_url         = found_repo["html_url"]
      @repo.description      = found_repo["description"]
      @repo.stargazers_count = found_repo["stargazers_count"]
      @repo.homepage         = found_repo["homepage"]
      @repo.language         = found_repo["language"]
      @repo.avatar_url       = found_repo["owner"]["avatar_url"]
      @repo.creation_date    = found_repo["created_at"]
      @repo.update_date      = found_repo["updated_at"]

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
