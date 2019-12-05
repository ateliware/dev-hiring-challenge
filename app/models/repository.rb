class Repository < ApplicationRecord
    validates :name, :presence => true
    validates :login_name, :presence => true
    validates :stars, :presence => true
    validates :language, :presence => true
end
