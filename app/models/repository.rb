class Repository < ApplicationRecord
  belongs_to :language

  has_many :starred_repositories
  has_many :users, through: :starred_repositories

  def name
    full_name.split("/").second
  end

  def owner_name
    full_name.split("/").first
  end
end
