require 'rails_helper'
require 'language'

describe Language do
  it 'should always have a name' do
    language = Language.new
    language.hash_response = {}
    expect(language.save).to eq(false)
  end

  # it 'should always have a hash_response' do
  #   language = Language.new
  #   language.name = 'test'
  #   expect(language.save).to eq(false)
  # end
end