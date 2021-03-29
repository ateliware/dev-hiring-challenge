class Language < ApplicationRecord
  validates :name, presence: true
  serialize :hash_response, Hash
end
