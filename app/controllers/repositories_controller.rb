class RepositoriesController < ApplicationController
  include Response
  include ExceptionHandler

  # GET repositories/:id
  def show
    repository = Repository.find(params[:id])
    json_response(repository)
  end
end
