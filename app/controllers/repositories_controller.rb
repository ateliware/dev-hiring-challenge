class RepositoriesController < ApplicationController
    protect_from_forgery with: :null_session

    # GET api/v1/repositories
    def index
        @repository = Repository.all
        render :json => @repository.to_json()
    end

    #POST api/v1/repositories
    def create
        
        repository = Repository.new(
            name: params['repository']['name'],
            login_name: params['repository']['login_name'],
            stars: params['repository']['stars'],
            language: params['repository']['language'],
            image_url: params['repository']['image_url']
        )

        repository.save!

        if repository.save
            flash[:notice] = "Teste."
            render json: {
                status: :created,
            }
        else
            render json: { status:500 }
        end
    end

    def home
        
    end

end