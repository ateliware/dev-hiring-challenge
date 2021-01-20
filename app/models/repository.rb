# frozen_string_literal: true

class Repository < ApplicationRecord
  belongs_to :importer
  belongs_to :owner
end
