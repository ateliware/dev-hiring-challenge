class Repository < ApplicationRecord
  belongs_to :user
  validates :name, :html_url, :owner, :language, presence: true
  validates_uniqueness_of :name, scope: %i[user_id owner]
end
