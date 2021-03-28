class RepositoriesController < ApplicationController
  def index
    @total_count = 0

    if github_connector
      @total_count = github_connector.total_count
      @repositories = github_connector.repositories
    end
  end

  private

  def search_params
    params.permit(:language, :page)
  end

  def github_connector
    @github_connector ||= Github::Repositories.new(search_params).call
  end
end
