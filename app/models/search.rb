class Search < ApplicationRecord
  validates :language, presence: true, uniqueness: { case_sensitive: false }
end
