class FetchGithubJob < ApplicationJob
  queue_as :default
  
  # Remove old repositories, call "perform", and send result as json
  # through ActionCable
  around_perform do |job, block|
    repo_params = block.call

    language = job.arguments.first
    language.repositories.destroy_all

    repo_params.each do |repo|
      language.repositories.create!(repo)
    end

    ActionCable.server.broadcast 'repositories',
      language: ActiveModelSerializers::SerializableResource.new(language).as_json
  end

  def perform(language)
    repo_params = language.fetch_repositories
    return repo_params
  end
end
