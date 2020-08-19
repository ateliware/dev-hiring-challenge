class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true, format: { with: /\A\S+@.+\.\S+\z/}
  validates :password, presence: true, length: { in: Devise.password_length }, confirmation: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
