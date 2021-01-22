# frozen_string_literal: true

class Repository < ApplicationRecord
  belongs_to :importer
  belongs_to :owner

  validates :name, :full_name, :html_url, :language, :github_repo_id, presence: true

  def to_param
    "#{id}-#{name}".parameterize(separator: '-')
  end
end
