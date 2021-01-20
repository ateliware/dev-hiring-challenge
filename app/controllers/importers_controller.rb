# frozen_string_literal: true

class ImportersController < ApplicationController
  def create
    GithubRepositoriesProcessJob.perform_later
    redirect_back(fallback_location: repositories_path, notice: 'Atualização iniciada')
  end
end
