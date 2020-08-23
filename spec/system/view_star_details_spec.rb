require 'rails_helper'

RSpec.describe 'View star details' do
  before do
    driven_by :rack_test
  end

  it 'displays repository details' do
    star = Star.create(name: 'rails/rails', github_url: 'github.com/rails/rails')

    visit "/stars/#{star.id}"

    expect(page).to have_css "a[href='#{star.github_url}']"
  end
end
