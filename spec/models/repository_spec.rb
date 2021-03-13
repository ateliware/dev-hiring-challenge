require 'rails_helper'

RSpec.describe Repository, type: :model do
  language = Language.new(name: 'Ruby', code: 'ruby')

  subject {
    described_class.new(
      name:              'Repository',
      owner:             'Owner',
      html_url:          'https://github.com/owner/repository',
      description:       'This is my repository',
      create_date:       Date.today - 1,
      update_date:       Date.today,
      stargazers_count:  123,
      forks_count:       123,
      open_issues_count: 15,
      language:          language
    )
  }

  it "works with valid attributes" do
    expect(subject).to be_valid
  end
  
  it "must have a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it "must have an owner" do
    subject.owner = nil
    expect(subject).to_not be_valid
  end

  it "must have a html_url" do
    subject.html_url = nil
    expect(subject).to_not be_valid
  end

  it "must have a description" do
    subject.description = nil
    expect(subject).to_not be_valid
  end

  it "must have a create_date" do
    subject.create_date = nil
    expect(subject).to_not be_valid
  end

  it "must have an update date" do
    subject.update_date = nil
    expect(subject).to_not be_valid
  end

  it "must have a stargazers count" do
    subject.stargazers_count = nil
    expect(subject).to_not be_valid
  end

  it "must have a forks count" do
    subject.forks_count = nil
    expect(subject).to_not be_valid
  end

  it "must have an open issues count" do
    subject.open_issues_count = nil
    expect(subject).to_not be_valid
  end

  it "must have a language" do
    subject.language = nil
    expect(subject).to_not be_valid
  end

  it "must have an update_date greater than create_date" do
    subject.create_date = Date.today + 1
    subject.update_date = Date.today
    expect(subject).to_not be_valid
  end

  it "must have a valid github url as html_url" do
    subject.html_url = 'http://example.com/owner/repository'
    expect(subject).to_not be_valid

    subject.html_url = 'https://github.com/owner'
    expect(subject).to_not be_valid

    subject.html_url = 'http://github.com/owner/repository/extra'
    expect(subject).to_not be_valid
  end
end
