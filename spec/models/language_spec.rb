require 'rails_helper'

RSpec.describe Language, type: :model do
  context 'with blank name on creation' do
    it 'raises RecordInvalid' do
      expect { Language.create!(name: '') }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  context 'with no parameters on creation' do
    it 'raises NoMethodError' do
      expect { Language.create!() }.to raise_error(NoMethodError)
    end
  end

  context 'when name is not null or empty' do
    it 'creates language properly' do
      language = Language.create!(name: 'javascript')
      expect(language.name).to eq('javascript')
      expect(language.slug).to eq('javascript')
    end
  end

  context 'when the language name has more than 1 word' do
    it 'creates language properly and slug separate words with hyphen' do
      language = Language.create!(name: 'language name')
      expect(language.name).to eq('language name')
      expect(language.slug).to eq('language-name')
    end
  end
end
