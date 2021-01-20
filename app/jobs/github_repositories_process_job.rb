# frozen_string_literal: true

class GithubRepositoriesProcessJob < ApplicationJob
  def perform
    Github::RepositoriesProcessor.call
  end
end
