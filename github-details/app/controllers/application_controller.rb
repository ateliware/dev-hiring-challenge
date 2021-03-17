class ApplicationController < ActionController::Base
  def status
    @date = Date.current
  end
end
