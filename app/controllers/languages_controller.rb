class LanguagesController < ApplicationController
  before_action :set_language, only: %i[ show ]

  # GET /languages or /languages.json
  def index
    @languages = Language.all
  end

  # GET /languages/1 or /languages/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_language
      @language = Language.find_by slug: params[:slug]
    end

    # Only allow a list of trusted parameters through.
    def language_params
      params.require(:language).permit(:name)
    end
end
