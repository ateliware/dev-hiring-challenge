class ApplicationController < ActionController::Base
  rescue_from ActionController::UnknownFormat do |exception|
    redirect_to(controller: request.params[:controller], action: request.params[:action], format: "html")
  end

  def status
    @date = Date.current
  end
end
