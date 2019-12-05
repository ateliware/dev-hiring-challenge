require "rails_helper"

RSpec.describe Repository, type: :model do

    it "succesfull created" do
        rep = Repository.create!(name: "rails", login_name: "rails", stars: 44600 , language: "Ruby" )
        expect(rep.name).to eq("rails")
        expect(rep.login_name).to eq("rails")
        expect(rep.stars).to eq("44600")
        expect(rep.language).to eq("Ruby")
    end

    it "is not valid without a name" do
        rep = Repository.new(name: nil)
        expect(rep).to_not be_valid
    end

    it "is not valid without a login_name" do
        rep = Repository.new(login_name: nil)
        expect(rep).to_not be_valid
    end

    it "is not valid without a stars" do
        rep = Repository.new(stars: nil)
        expect(rep).to_not be_valid
    end

    it "is not valid without a language" do
        rep = Repository.new(language: nil)
        expect(rep).to_not be_valid
    end
end

