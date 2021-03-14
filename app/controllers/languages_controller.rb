class LanguagesController < ApplicationController
  include Response
  include ExceptionHandler

  # GET languages
  def index
    @languages_json = []

    # Build list of languages to be rendered by react component
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
    
    json_response({message: "Successful request"})
  end
end
