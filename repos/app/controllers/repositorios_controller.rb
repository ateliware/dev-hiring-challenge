class RepositoriosController < ApplicationController
  require 'rest-client'
  require 'github/api'
  before_action :set_repositorio, only: %i[ show update destroy ]
  before_action :build_repositorios, only: :create

  # GET /repositorios
  # GET /repositorios.json
  def index
    @repositorios = Repositorio.includes(:owner)
  end

  # GET /repositorios/1
  # GET /repositorios/1.json
  def show
  end

  # POST /repositorios
  # POST /repositorios.json
  def create

    Repositorio.transaction do
      response_save = repositorio_params(@repositorios_json).each do |repo_param|
        repositorio = Repositorio.new(repo_param.except(:owner))
        repositorio.build_owner(repo_param[:owner])
        repositorio.save
      end
      if response_save
        redirect_to repositorios_path
      else
        render json: @repositorio.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /repositorios/1
  # PATCH/PUT /repositorios/1.json
  def update
    if @repositorio.update(repositorio_params(@repositorios))
      render :show, status: :ok, location: @repositorio
    else
      render json: @repositorio.errors, status: :unprocessable_entity
    end
  end

  # DELETE /repositorios/1
  # DELETE /repositorios/1.json
  def destroy
    @repositorio.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repositorio
      @repositorio = Repositorio.find(params[:id])
    end

  def build_repositorios
    restclient = Github::Api.new({})
    @repositorios_json = restclient.get_repositories
    @repositorios_json = { "repositorios": @repositorios_json['items'] }
  end

    # Only allow a list of trusted parameters through.
    def repositorio_params params
      params.fetch(:repositorios).map do |param|
        ActionController::Parameters.new(param).permit(
          :name, :full_name, :language, :description, :private,
          owner: [ :id, :login, :avatar_url ]
        )
      end
    end
end
