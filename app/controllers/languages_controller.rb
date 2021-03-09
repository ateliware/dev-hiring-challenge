class LanguagesController < ApplicationController
  def index
    @languages_json = []

    Language.all.each do |language|
      @languages_json << {
        id: language.id,
        name: language.name
      }
    end
  end
end
