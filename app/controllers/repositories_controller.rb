class RepositoriesController < ApplicationController
    def index
        languages = Language.all

        languages.each do |language|
            repositories = language.fetch_repositories

            language.repositories.destroy_all
            language.repositories.create repositories
        end

        render :json => Repository.all        
    end
end
