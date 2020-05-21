require "rails_helper"

RSpec.describe RepositoriesSearch, type: :model do
  describe "validations" do
    it "language is required" do
      rep_search = described_class.new
      expect(rep_search).to_not be_valid

      rep_search = described_class.new(language: "Ruby")
      expect(rep_search).to be_valid
    end
  end

  describe "happy path" do
    it "create repositories" do

      rep_search = described_class.new(language: "Ruby")
      expect(rep_search).to be_valid

      expect(Repository.count).to eql(0)
      expect(Owner.count).to eql(0)

      rep_search.save!

      expect(rep_search.repositories.count).to eql(9)
      expect(Repository.count).to eql(9)
      expect(Owner.count).to eql(9)
      expect(Repository.where(language: "Ruby").count).to eql(9)

      first_rep = Repository.first
      expect(first_rep.owner).to be_present
      expect(rep_search.repositories.first["id"]).to eql(first_rep[:github_id])
      expect(rep_search.repositories.first["name"]).to eql(first_rep[:name])
      expect(rep_search.repositories.first["description"]).to eql(first_rep[:description])
      expect(rep_search.repositories.first["created_at"]).to eql(first_rep[:creation_date].iso8601)
      expect(rep_search.repositories.first["language"]).to eql(first_rep[:language])
      expect(rep_search.repositories.first["forks_count"]).to eql(first_rep[:forks_count])
      expect(rep_search.repositories.first["stargazers_count"]).to eql(first_rep[:stargazers_count])
      expect(rep_search.repositories.first["open_issues_count"]).to eql(first_rep[:open_issues_count])
      expect(rep_search.repositories.first["html_url"]).to eql(first_rep[:github_url])

      expect(rep_search.repositories.first["owner"]["login"]).to eql(first_rep.owner.github_login)
      expect(rep_search.repositories.first["owner"]["avatar_url"]).to eql(first_rep.owner.avatar_url)
      expect(rep_search.repositories.first["owner"]["html_url"]).to eql(first_rep.owner.github_url)
    end

    it "if repository exists doenst create" do
      rep_search = described_class.new(language: "Ruby")
      expect(rep_search).to be_valid

      expect(Repository.count).to eql(0)

      rep_search.save!

      expect(rep_search.repositories.count).to eql(9)
      expect(Repository.count).to eql(9)
      expect(Repository.where(language: "Ruby").count).to eql(9)


      rep_search = described_class.new(language: "Ruby")
      expect(rep_search).to be_valid

      expect(Repository.count).to eql(9)

      rep_search.save!

      expect(Repository.count).to eql(9)
      expect(Repository.where(language: "Ruby").count).to eql(9)
    end
  end
end
