class Owner < ApplicationRecord
  has_many :repositorios

  validates :avatar_url, presence: true
end