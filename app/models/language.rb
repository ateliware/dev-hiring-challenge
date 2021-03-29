class Language < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :slug, uniqueness: true, presence: true
  
  before_validation do
    self.slug = self.name&.slugify_trim
  end
end
