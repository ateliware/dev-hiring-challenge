# frozen_string_literal: true

class StarredRepositoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @starred_repositories = current_user.starred_repositories
  end

  def create
    @starred_repository = StarredRepository.new(repository_params)

    respond_to do |format|
      @starred_repository.save
      format.js
    end
  end

  def destroy
    @starred_repository = StarredRepository.find(params.require(:id))

    respond_to do |format|
      @starred_repository.destroy
      format.js
    end
  end

  private

  def repository_params
    p = params.require(:starred_repository)
              .permit(repository_attributes: %i[external_id full_name url description language])

    p["repository_attributes"]["language"] = Language.find_by(name: p["repository_attributes"]["language"])

    p["user"] = current_user

    p
  end
end
