class Repo < ApplicationRecord

  belongs_to :topic

  def self.search_by_topics(topics)
    client = Octokit::Client.new

    topics = topics.select { |topic| topic.length > 0 }

    repos = []

    topics.each do |topic|
      client.search_repositories("#{topic}+is:featured", per_page: 5).items.each do |r|
        repo = self.find_by__id(r[:id]) || self.new

        repo.attributes = r.to_hash.slice *self.attribute_names.select {|attr| attr != "id"}.map(&:to_sym)

        repo[:_id] = r[:id]

        repo.topic = Topic.find_or_create_by(name: topic)

        repo.save!

        repos << repo
      end
    end

    repos
  end
end
