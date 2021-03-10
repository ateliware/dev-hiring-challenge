class RepositoriesController < ApplicationController

  # GET repositories/:id
  def show
    repository = Repository.find(params[:id])

    respond_to do |format|
      format.json { render json: repository, status: :ok }
    end
  end
end
