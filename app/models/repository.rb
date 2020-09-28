# frozen_string_literal: true

class Repository < ApplicationRecord
  validates :uid, :name, :avatar_url, :watchers_count, :description, :url, presence: true
  audited
end
