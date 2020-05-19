class RepositoriesController < ApplicationController
  def index
    github = Github.new
    @repositories = github.repositories
  end
end
