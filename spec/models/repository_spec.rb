# frozen_string_literal: true

require "rails_helper"

RSpec.describe Repository, type: :model do
  subject { create :repository }

  describe "associations" do
    it { should have_many(:starred_repositories) }
    it { should validate_uniqueness_of(:external_id).case_insensitive }
  end

  describe "#name" do
    it { expect(subject.name).to eq("repo") }
  end

  describe "#owner_name" do
    it { expect(subject.owner_name).to eq("owner") }
  end
end
