require 'rails_helper'

RSpec.describe IntroductionsController do
  it 'should save the language name that comes from the input lowercased on the db' do
    post :create, params: { introduction: { name: 'COBOL'}}
    expect(Introduction.last.name).to eq('cobol')
  end

  it 'should ignore names consisting only of spaces' do
    name = Introduction.last.name
    post :create, params: { introduction: {name: '   '}}
    expect(Introduction.last.name).to eq(name)
  end
end