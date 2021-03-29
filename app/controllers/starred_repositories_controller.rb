class StarredRepositoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @starred_repositories = current_user.starred_repositories
  end

  def create
    @starred_repository = StarredRepository.new(repository_params)

    binding.pry

    respond_to do |format|
      if @starred_repository.save
        format.js
      else
        format.js
      end
    end
  end

  def destroy
    @starred_repository = StarredRepository.find(params.require(:id))

    respond_to do |format|
      if @starred_repository.destroy
        format.js
      else
        format.js
      end
    end
  end

  private

  def repository_params
    p = params.require(:starred_repository)
              .permit(repository_attributes: [:external_id, :full_name, :url, :description, :language])

    p["repository_attributes"]["language"] = Language.find_by(name: p["repository_attributes"]["language"])

    p["user"] = current_user

    p
  end
end
