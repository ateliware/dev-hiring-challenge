class RepositoriesController < ApplicationController
  before_action :set_repository, only: %i[ show destroy ]

  # GET /repositories or /repositories.json
  def index
    @repositories = Repository.all.as_json(include: :organization)
  end

  # POST /repositories or /repositories.json
  def create
    @repository = Repository.new(repository_params)

    respond_to do |format|
      if @repository.save
        format.json { head :no_content, status: :created }
      else
        format.json { render json: @repository.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /repositories/1 or /repositories/1.json
  def destroy
    @repository.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repository
      @repository = Repository.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def repository_params
      params.require(:repository).permit(:name, :organization_id)
    end
end
