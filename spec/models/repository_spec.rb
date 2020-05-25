require 'rails_helper'

RSpec.describe Repository do
  describe '#id' do
    it { is_expected.to respond_to(:id) }
  end

  describe '#node_id' do
    it { is_expected.to respond_to(:node_id) }
  end

  describe '#name' do
    it { is_expected.to respond_to(:name) }
  end

  describe '#full_name' do
    it { is_expected.to respond_to(:full_name) }
  end

  describe '#description' do
    it { is_expected.to respond_to(:description) }
  end

  describe '#stargazers_count' do
    it { is_expected.to respond_to(:stargazers_count) }
  end

  describe '#watchers_count' do
    it { is_expected.to respond_to(:watchers_count) }
  end

  describe '#language' do
    it { is_expected.to respond_to(:language) }
  end

  describe '#forks_count' do
    it { is_expected.to respond_to(:forks_count) }
  end

  describe '#open_issues_count' do
    it { is_expected.to respond_to(:open_issues_count) }
  end
end
