require 'rails_helper'

RSpec.describe 'List stars', type: :system do
  before do
    driven_by :rack_test
  end

  it 'lists repositories with the most stars' do
    star = Star.create(name: 'rails/rails')

    visit '/'
    click_on 'Find GitHub stars'

    expect(page).to have_content 'rails/rails'
    details_link = find("a[href='#{star_path(star)}']")
    within(details_link) do
      expect(page).to have_content 'See details'
    end
  end
end
