require 'rails_helper'

RSpec.describe Repository, type: :model do
  context "only with all not nullable fields filled" do
    it "should create repository" do
      language = Language.create!(name: "python")
      Repository.create!(
        name: "django",
        description: "The Web framework for perfectionists with deadlines.",
        node_id: "MDEwOlJlcG9zaXRvcnk0MTY0NDgy",
        github_id: 4164482,
        full_name: "django/django",
        stars: 68179,
        url: "https://github.com/django/django",
        forks: 28443,
        open_issues: 161,
        license: "BSD 3-Clause \"New\" or \"Revised\" License",
        origin_created_at: DateTime.now,
        origin_updated_at: DateTime.now,
        topics: ["apps", "django", "framework", "models", "orm", "python", "templates", "views", "web"],
        language: language
      )
      expect(Repository.last.github_id).to eq(4164482)
    end
  end

  context "the repository won't be created if" do
    let(:repository_data) do
      language = Language.create!(name: "python")
      {
        name: "django",
        description: "The Web framework for perfectionists with deadlines.",
        node_id: "MDEwOlJlcG9zaXRvcnk0MTY0NDgy",
        github_id: 4164482,
        full_name: "django/django",
        stars: 68179,
        url: "https://github.com/django/django",
        forks: 28443,
        open_issues: 161,
        license: "BSD 3-Clause \"New\" or \"Revised\" License",
        origin_created_at: DateTime.now,
        origin_updated_at: DateTime.now,
        topics: ["apps", "django", "framework", "models", "orm", "python", "templates", "views", "web"],
        language: language
      }
    end
    it "is missing name" do
      repository_data[:name] = ""
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing full_name" do
      repository_data[:full_name] = ""
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing node_id" do
      repository_data[:node_id] = ""
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing github_id" do
      repository_data[:github_id] = nil
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing stars" do
      repository_data[:stars] = nil
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing forks" do
      repository_data[:forks] = nil
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing url" do
      repository_data[:url] = ""
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing open_issues" do
      repository_data[:open_issues] = nil
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing origin_created_at" do
      repository_data[:origin_created_at] = nil
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing origin_updated_at" do
      repository_data[:origin_updated_at] = nil
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is missing origin_updated_at" do
      repository_data[:language] = nil
      expect { Repository.create!(repository_data) }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
