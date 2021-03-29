require 'rails_helper'

RSpec.describe "repositories/new", type: :view do
  before(:each) do
    assign(:repository, Repository.new(
      name: "MyString",
      owner_avatar: "MyString",
      description: "MyString",
      html_url: "MyString",
      home_page: "MyString",
      stargazers_count: 1,
      language: nil
    ))
  end

  it "renders new repository form" do
    render

    assert_select "form[action=?][method=?]", repositories_path, "post" do

      assert_select "input[name=?]", "repository[name]"

      assert_select "input[name=?]", "repository[owner_avatar]"

      assert_select "input[name=?]", "repository[description]"

      assert_select "input[name=?]", "repository[html_url]"

      assert_select "input[name=?]", "repository[home_page]"

      assert_select "input[name=?]", "repository[stargazers_count]"

      assert_select "input[name=?]", "repository[language_id]"
    end
  end
end
