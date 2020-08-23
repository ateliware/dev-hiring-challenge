require 'rails_helper'

RSpec.describe 'List stars', type: :system do
  before do
    driven_by :rack_test
  end

  it 'lists repositories with the most stars' do
    Star.create(name: 'rails/rails')

    visit '/'
    click_on 'Find GitHub stars'

    expect(page).to have_content 'rails/rails'
  end
end
