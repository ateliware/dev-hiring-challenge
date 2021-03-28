class StarredRepositoriesController < ApplicationController
  def create
    @starred_repository = StarredRepository.new(repository_params)

    respond_to do |format|
      if @starred_repository.save
        format.js
      else
        format.js
      end
    end
  end

  private

  def repository_params
    p = params.require(:starred_repository)
              .permit(repository_attributes: [:id, :full_name, :html_url, :description, :language])

    p["repository_attributes"]["external_id"] = p["repository_attributes"].extract!("id")["id"]
    p["repository_attributes"]["url"] = p["repository_attributes"].extract!("html_url")["html_url"]
    p["repository_attributes"]["language"] = Language.find_by(name: p["repository_attributes"]["language"])

    p["user"] = current_user

    p
  end
end
