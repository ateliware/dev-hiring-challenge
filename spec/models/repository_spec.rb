require 'rails_helper'

RSpec.describe Repository, type: :model do
  before do 

    @repository = Repository.new
    @repository.name = "Xing Shun"

  end
  context 'Before Submit' do
    it 'have not repositories in database' do
      expect(Repository.count).to eq 0
    end
  end
  context 'After Submit' do
    it 'Should not to return data' do 
      languages = []
      ApiImporter.new(languages).call   
      expect(Repository.count).to eq 0       
    end

    it 'Should to return data' do
      languages = ['ruby', 'php', 'java', 'python', 'c']
      ApiImporter.new(languages).call        
      expect(Repository.count).not_to eq 0
    end

    it 'Validating presence of all columns' do
      expect{@repository.save!}.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
