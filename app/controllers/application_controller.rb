class ApplicationController < ActionController::Base
  def current_page
    params[:page] || 1
  end
end
