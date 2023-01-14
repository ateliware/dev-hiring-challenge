require 'rails_helper'

RSpec.describe "Languages", type: :request do
  describe "GET /index" do
    it 'should get all languages' do
      language1 = Language.create!(name: 'javascript')
      language2 = Language.create!(name: 'ruby')
      get "/"
      expect(assigns(:languages)).to eq([language1, language2])
    end

    it "renders the index template" do
      get "/"
      expect(response).to render_template(:index)
    end
  end

  describe "GET /show" do
    it 'should get language by slug' do
      language = Language.create!(name: 'javascript')
      get "/languages/#{language.slug}"
      expect(response).to render_template(:show)
    end

    it 'should raise error if id is passed instead of slug' do
      language = Language.create!(name: 'javascript')
      expect { get "/languages/#{language.id}" }.to raise_error(StandardError)
    end
  end
end
