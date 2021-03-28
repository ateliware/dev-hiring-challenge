class StarredRepository < ApplicationRecord
  belongs_to :user
  belongs_to :repository

  accepts_nested_attributes_for :repository
end
