# frozen_string_literal: true

class Repository < ApplicationRecord
  belongs_to :language

  has_many :starred_repositories
  has_many :users, through: :starred_repositories

  validates :external_id, uniqueness: true

  def name
    full_name.split("/").second
  end

  def owner_name
    full_name.split("/").first
  end
end
