class RepositoriesController < ApplicationController
  before_action :set_repository, only: [:show, :edit, :update, :destroy]
  LANGUAGES = ['ruby', 'elixir', 'python', 'pyspark', 'javascript']

  # GET /repositories
  # GET /repositories.json
  def index
    @repositories = Repository.all
  end

  # GET /repositories/1
  # GET /repositories/1.json
  def show
  end

  # GET /repositories/new
  def new
    @repository = Repository.new
  end

  # GET /repositories/1/edit
  def edit
  end

  # POST /repositories
  # POST /repositories.json
  def create
    @repository = Repository.new(repository_params)

    respond_to do |format|
      if @repository.save
        format.html { redirect_to @repository, notice: 'Repositório criado com sucesso.' }
        format.json { render :show, status: :created, location: @repository }
      else
        format.html { render :new }
        format.json { render json: @repository.errors, status: :unprocessable_entity }
      end
    end
  end

  def sample
    respond_to do |format|
      begin
        LANGUAGES.each do |language|
          sample = Github::Repositories.new('stars', 1, 1, language).send
          sample = sample['items'].first
          Repository.new(uid: sample['id'], name: sample['name'], avatar_url: sample['owner']['avatar_url'], watchers_count: sample['watchers_count'], description: sample['description'], url: sample['html_url']).save
        end
        format.html { redirect_to repositories_url, notice: 'Repositórios importados com sucesso.' }
        format.json { render :index, status: :ok }
      rescue StandardError => e
        format.html { redirect_to repositories_url, notice: 'Ocorreu um erro ao importar os repositórios.' }
        format.json { render json: e.inspect, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /repositories/1
  # PATCH/PUT /repositories/1.json
  def update
    respond_to do |format|
      if @repository.update(repository_params)
        format.html { redirect_to @repository, notice: 'Repositório atualizado com sucesso.' }
        format.json { render :show, status: :ok, location: @repository }
      else
        format.html { render :edit }
        format.json { render json: @repository.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /repositories/1
  # DELETE /repositories/1.json
  def destroy
    @repository.destroy
    respond_to do |format|
      format.html { redirect_to repositories_url, notice: 'Repositório excluido com sucesso.' }
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
      params.require(:repository).permit(:uid, :name, :avatar_url, :watchers_count, :description, :url)
    end
end
