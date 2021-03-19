class LanguagesController < ApplicationController
    def index
        render :json => Language.all
    end
end
