require 'rails_helper'

RSpec.describe LanguagesController do
  before do
    opened_link = URI.parse("https://api.github.com/search/repositories?q=ruby&per_page=1").read
    saved_json = JSON.parse(opened_link)
    language = Language.new
    language.hash_response = saved_json['items'].first
    language.name = language.hash_response['language']
    language.save
  end

  describe 'language#index' do
    it 'should get the correct response of the index route' do
      get :index
      expect(response.content_type).to eq('text/html; charset=utf-8')
    end
  end

  describe 'language#show' do
    it 'should show the language based on the id parameter' do
      get :show, params: { id: Language.last.id }
      expect(response.content_type).to eq('text/html; charset=utf-8')
    end
  end

  describe 'languages#fetch_data' do
    it 'should save the name of the introduction and a empty hash in case the search returns empty' do
      Introduction.delete_all
      introduction = Introduction.new
      introduction.name = 'jidj21ojd12dkj21'
      introduction.save
      get :fetch_data
      test = []
      test << Language.last.name << Language.last.hash_response
      expect(test).to eq(['jidj21ojd12dkj21', {}])
    end
  end

  # it 'should ignore names consisting only of spaces' do
  #   name = Introduction.last.name
  #   post :create, params: { introduction: {name: '   '}}
  #   expect(Introduction.last.name).to eq(name)
  # end
end