# frozen_string_literal: true

module Github
  class RepositoriesProcessor
    UNIQUE_FIELDS = %i[github_repo_id stargazers_count watchers_count forks_count open_issues_count].freeze

    class << self
      def call
        response = SearchRepositories.call
        importer = Importer.create(response: response)

        repositories = response['items'].map.with_index do |params, index|
          new(params, importer, index).repository_attributes
        end

        Repository.upsert_all(repositories, returning: false, unique_by: UNIQUE_FIELDS)
        importer.update(finished_at: Time.zone.now)
      end
    end

    def initialize(repository_params, importer, position)
      @repository_params = repository_params
      @importer = importer
      @position = position
    end

    def repository_attributes
      @repository_params.slice(*Repository.new.attributes.keys).without('id').merge(
        github_repo_id: @repository_params['id'], importer_id: @importer.id,
        owner_id: find_or_create_owner.id, position: @position
      )
    end

    private

    def find_or_create_owner
      owner = Owner.find_or_initialize_by(login: @repository_params['owner']['login'])
      return owner if owner.persisted?

      owner.assign_attributes(owner_attributes)
      owner.save
      owner
    end

    def owner_attributes
      @repository_params['owner'].slice(*Owner.new.attributes.keys).without('id')
    end
  end
end
