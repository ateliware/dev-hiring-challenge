class Language < ApplicationRecord
  has_many :repositories, dependent: :destroy
  validates_uniqueness_of :name
end
