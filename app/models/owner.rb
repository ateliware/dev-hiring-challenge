# frozen_string_literal: true

class Owner < ApplicationRecord
  validates :avatar_url, :login, :html_url, presence: true
end
