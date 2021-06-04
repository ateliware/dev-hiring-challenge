class Repositorio < ApplicationRecord
  belongs_to :owner
  validates :name, :full_name, presence: true
end
