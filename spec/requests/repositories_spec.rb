require 'rails_helper'

RSpec.describe "Repositories", type: :request do
  describe "GET #show" do
    it 'should render repositories#show template' do
      language = Language.create!(name: 'python')
      repository = Repository.create!(
        name: "Python",
        full_name: "TheAlgorithms/Python",
        description: "All Algorithms implemented in Python",
        stars: 0,
        forks: 0,
        open_issues: 0,
        license: "license",
        topics: [],
        origin_created_at: DateTime.now,
        origin_updated_at: DateTime.now,
        url: "https://github.com/TheAlgorithms/Python",
        language: language
      )
      get "/repositories/#{repository.id}"
      expect(response).to render_template(:show)
    end

    it 'should get correct repository' do
      language = Language.create!(name: 'python')
      repository = Repository.create!(
        name: "Python",
        full_name: "TheAlgorithms/Python",
        description: "All Algorithms implemented in Python",
        stars: 0,
        forks: 0,
        open_issues: 0,
        license: "license",
        topics: [],
        origin_created_at: DateTime.now,
        origin_updated_at: DateTime.now,
        url: "https://github.com/TheAlgorithms/Python",
        language: language
      )
      get "/repositories/#{repository.id}"
      expect(assigns(:repository)).to eq(repository)
    end
  end
end
