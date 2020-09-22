class RepositoriesController < ApplicationController

    def index
        @repositories = Repository.all
    end

    def create
        languages = ['ruby', 'php', 'java', 'python', 'c']
        ApiImporter.new(languages).call
        redirect_to root_path
    end

    def show
        @repository = Repository.find(params[:id])    
    end
    
end
