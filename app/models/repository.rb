class Repository < ApplicationRecord
    validates :node_id, uniqueness: true 
    validates :name, presence: true
end
