require 'rails_helper'
require 'introduction'

describe Introduction do
  it 'should always have at least five languages on the db' do
    expect(Introduction.all.length).to be >= 5
  end

  it 'should always have the five default languages (ruby, javascript, python, elixir, javascript) on the db' do
    languages = %w[ruby javascript python elixir javascript]
    Introduction.all.each do |introduction|
      languages.include?(introduction.name) && languages.delete(introduction.name)
    end
    expect(languages.length).to eq(0)
  end

  it 'should have a name and it cannot be empty of characters' do 
    tester = false
    Introduction.all.each do |introduction|
      introduction.name.gsub(' ', '') == '' && tester = true
    end
    expect(tester).to eq(false)
  end
end
