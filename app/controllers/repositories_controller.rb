class RepositoriesController < ApplicationController
  before_action :set_repository, only: %i[ show ]

  # GET /repositories/1 or /repositories/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repository
      @repository = Repository.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def repository_params
      params.require(:repository).permit(:name, :node_id, :github_id, :full_name, :stars, :url, :forks, :open_issues, :license, :origin_created_at, :origin_updated, :topics, :language_id)
    end
end
