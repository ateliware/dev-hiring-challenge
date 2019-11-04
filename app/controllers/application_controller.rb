class ApplicationController < ActionController::Base
  before_action :set_variables

  def set_variables
    @languages_list = Rails.configuration.x.languages
  end
end
