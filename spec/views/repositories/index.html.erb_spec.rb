require 'rails_helper'

RSpec.describe "repositories/index", type: :view do
  before(:each) do
    assign(:repositories, [
      Repository.create!(
        name: "Name",
        owner_avatar: "Owner Avatar",
        description: "Description",
        html_url: "Html Url",
        home_page: "Home Page",
        stargazers_count: 2,
        language: nil
      ),
      Repository.create!(
        name: "Name",
        owner_avatar: "Owner Avatar",
        description: "Description",
        html_url: "Html Url",
        home_page: "Home Page",
        stargazers_count: 2,
        language: nil
      )
    ])
  end

  it "renders a list of repositories" do
    render
    assert_select "tr>td", text: "Name".to_s, count: 2
    assert_select "tr>td", text: "Owner Avatar".to_s, count: 2
    assert_select "tr>td", text: "Description".to_s, count: 2
    assert_select "tr>td", text: "Html Url".to_s, count: 2
    assert_select "tr>td", text: "Home Page".to_s, count: 2
    assert_select "tr>td", text: 2.to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
  end
end
