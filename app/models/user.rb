class User < ApplicationRecord
  has_secure_password
  has_many :repositories, dependent: :destroy
  validates_uniqueness_of :email
  validates :email, presence: true
end
