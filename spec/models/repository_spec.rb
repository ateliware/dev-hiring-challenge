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
  
  it { should belong_to(:language) } 

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:owner) }
  it { should validate_presence_of(:html_url) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:create_date) }
  it { should validate_presence_of(:update_date) }
  it { should validate_presence_of(:stargazers_count) }
  it { should validate_presence_of(:forks_count) }
  it { should validate_presence_of(:open_issues_count) }

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
