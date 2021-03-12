require 'uri'

class Repository < ApplicationRecord
  belongs_to :language
  
  validates :name, 
            :owner,
            :html_url,
            :description,
            presence: true

  validates :html_url,
            format: { with: /\Ahttps?:\/\/github\.com\/[^\s\/]+\/[^\s\/]+\z/}

  validates :create_date,
            :update_date,
            presence: true

  validates :stargazers_count,
            :forks_count,
            :open_issues_count, 
            presence: true,
            numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  validate :valid_update_date?


  private

  def valid_update_date?
    return if [update_date.blank?, create_date.blank?].any?
    if create_date > update_date
      errors.add(:update_date, 'must come after create date')
    end
  end
end
