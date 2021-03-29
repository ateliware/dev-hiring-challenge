class StarredRepository < ApplicationRecord
  belongs_to :user
  belongs_to :repository

  accepts_nested_attributes_for :repository

  before_validation :find_or_create_repository

  validates_uniqueness_of :repository, scope: :user

  private

  def find_or_create_repository
    repository = Repository.find_by(external_id: self.repository&.external_id)

    self.repository = repository if repository.present?
  end
end
