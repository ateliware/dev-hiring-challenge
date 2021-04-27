class Repositorio < ApplicationRecord
    validates_presence_of :nome    
    validates_presence_of :descricao
    validates_presence_of :score
    validates_presence_of :data_criacao
    validates_presence_of :forks
    validates_presence_of :url
end
