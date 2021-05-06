class RepositoriesController < ActionController::API
  before_action :set_repository, only: %i[ show edit update destroy ]

  def index
    @repositories = Repository.all
    render json: @repositories
  end

  def show
    render json: @repository
  rescue ActiveRecord::RecordNotFound
    render json: {}, status: :not_found
  end

  # POST /repositories or /repositories.json
  def create
    @repository = Repository.upsert_all(repository_params)
    if @repository
      render json: @repository, status: :created
    else
      render json: @repository.errors, status: :unprocessable_entity
    end

  end

  def destroy
    @repository.destroy
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repository
      @repository = Repository.find(params[:id])
    end

    def repository_params
      params.require(:_json).map do |param| 
        param.require(:repository).permit(:id, :node_id, :name, :full_name, :private, :owner, :html_url, :description, :created_at, :updated_at, :pushed_at, :git_url, :ssh_url, :clone_url, :svn_url, :homepage, :size, :language, :forks, :license, :watchers, :stargazers_count)
      end
    end
end
