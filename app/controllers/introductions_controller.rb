class IntroductionsController < ApplicationController
  def index
    @introduction = Introduction.new
  end

  def create
    introduction_name = params['introduction']['name'].downcase
    @introduction = Introduction.new
    @introduction.name = introduction_name
    @introduction.save

    redirect_to index
  end

  private

  def introduction_params
    params.require(:introduction).permit(:name)
  end
end
