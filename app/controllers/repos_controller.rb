class ReposController < ApplicationController
  before_action :set_repo, only: %i[ show edit update destroy ]

  # GET /repos or /repos.json
  def index
    @repos = Repo.all
    @topics = Topic.all
  end

  # GET /repos/1 or /repos/1.json
  def show
  end

  # GET /repos/new
  def new
    @repo = Repo.new
  end

  # GET /repos/1/edit
  def edit
  end

  # POST /repos or /repos.json
  def create
    @repo = Repo.new(repo_params)

    respond_to do |format|
      if @repo.save
        format.html { redirect_to @repo, notice: "Repo was successfully created." }
        format.json { render :show, status: :created, location: @repo }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @repo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /repos/1 or /repos/1.json
  def update
    respond_to do |format|
      if @repo.update(repo_params)
        format.html { redirect_to @repo, notice: "Repo was successfully updated." }
        format.json { render :show, status: :ok, location: @repo }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @repo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /repos/1 or /repos/1.json
  def destroy
    @repo.destroy
    respond_to do |format|
      format.html { redirect_to repos_url, notice: "Repo was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def search
    @repos = Repo.search_by_topics search_params[:topics]

    respond_to do |format|
      format.json { render :search, status: :ok }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repo
      @repo = Repo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def repo_params
      params.require(:repo).permit(:_id, :node_id, :name, :full_name, :private, :html_url, :description, :fork, :url, :pushed_at, :homepage, :size, :stargazers_count, :watchers_count, :language, :forks_count, :open_issues_count)
    end

    def search_params
      params.permit(topics: [])
    end
end
