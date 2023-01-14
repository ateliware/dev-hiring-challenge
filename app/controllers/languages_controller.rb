class LanguagesController < ApplicationController
  before_action :set_language, only: %i[ show edit update destroy ]

  # GET /languages or /languages.json
  def index
    @languages = Language.all
  end

  # GET /languages/1 or /languages/1.json
  def show
  end

  # GET /languages/new
  def new
    @language = Language.new
  end

  # POST /languages or /languages.json
  def create
    @language = Language.new(language_params)

    respond_to do |format|
      if @language.save
        format.html { redirect_to language_url(@language), notice: "Language was successfully created." }
        format.json { render :show, status: :created, location: @language }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @language.errors, status: :unprocessable_entity }
      end
    end
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
