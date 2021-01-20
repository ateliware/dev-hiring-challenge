# frozen_string_literal: true

class Importer < ApplicationRecord
  has_many :repositories, dependent: :destroy
end
