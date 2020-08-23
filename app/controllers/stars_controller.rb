class StarsController < ApplicationController
  def index
    @stars = Star.fetch_all_from_github_or_database
  end

  def show
    @star = Star.find(params[:id])
  end
end
