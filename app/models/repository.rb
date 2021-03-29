class Repository < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  
  belongs_to :language
end
