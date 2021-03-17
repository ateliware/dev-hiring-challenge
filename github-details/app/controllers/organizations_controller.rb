class OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[ show ]

  # GET /organizations or /organizations.json
  def index
    @organizations = Organization.all
  end

  # GET /organizations/1 or /organizations/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization
        .find_by!(slug: params[:slug])
        .as_json(include: :repositories)
    end

    # Only allow a list of trusted parameters through.
    def organization_params
      params.require(:organization).permit(:slug)
    end
end
