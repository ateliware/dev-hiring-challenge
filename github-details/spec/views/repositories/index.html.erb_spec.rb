require 'rails_helper'

RSpec.describe "repositories/index", type: :view do
  before(:each) do
    assign(:repositories, [
      Repository.create!(
        name: "Name",
        organization: nil
      ),
      Repository.create!(
        name: "Name",
        organization: nil
      )
    ])
  end

  it "renders a list of repositories" do
    render
    assert_select "tr>td", text: "Name".to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
  end
end
