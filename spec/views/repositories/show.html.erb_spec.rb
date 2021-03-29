require 'rails_helper'

RSpec.describe "repositories/show", type: :view do
  before(:each) do
    @repository = assign(:repository, Repository.create!(
      name: "Name",
      owner_avatar: "Owner Avatar",
      description: "Description",
      html_url: "Html Url",
      home_page: "Home Page",
      stargazers_count: 2,
      language: nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Owner Avatar/)
    expect(rendered).to match(/Description/)
    expect(rendered).to match(/Html Url/)
    expect(rendered).to match(/Home Page/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(//)
  end
end
