class IntroductionsController < ApplicationController
  def index
    @introduction = Introduction.new
  end

  def create
    introduction_name = introduction_params[:name].downcase
    if introduction_name.gsub(' ', '').length.positive?
      @introduction = Introduction.new
      @introduction.name = introduction_name
      @introduction.save
    end
    redirect_to index
  end

  private

  def introduction_params
    params.require(:introduction).permit(:name)
  end
end
