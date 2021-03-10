class LanguagesController < ApplicationController

  # GET languages
  def index
    @languages_json = []

    Language.all.each do |language|
      @languages_json << {
        id: language.id,
        name: language.name
      }
    end
  end

  # Starts async FetchGithubJob, that will fetch Github's API and 
  # send result through ActionCable
  #
  # POST languages/:id/update_repositories
  def update_repositories
    language = Language.find(params[:id])
    FetchGithubJob.perform_later(language)

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
