class Repository < ApplicationRecord
  validates :full_name, presence: true
  validates :html_url, presence: true
end
