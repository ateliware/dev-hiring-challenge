class RepositoriesController < ApplicationController
  before_action :set_repository, only: %i[ show destroy ]

  # GET /repositories or /repositories.json
  def index
    @repositories = Repository.all
  end

  # POST /repositories or /repositories.json
  def create
    @repository = Repository.new(repository_params)

    respond_to do |format|
      if @repository.save
        format.html { redirect_to @repository, notice: "Repository was successfully saved." }
        format.json { head :no_content, status: :created }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @repository.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /repositories/1 or /repositories/1.json
  def destroy
    @repository.destroy
    respond_to do |format|
      format.html { redirect_to repositories_url, notice: "Repository was successfully removed." }
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
