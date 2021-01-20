# frozen_string_literal: true

class RepositoriesController < ApplicationController
  def index
    @repositories = Repository.joins(:owner, :importer).order(position: :asc).group(:id, :position, :language)
  end

  def show
    @repository = Repository.find(params[:id])
  end
end
