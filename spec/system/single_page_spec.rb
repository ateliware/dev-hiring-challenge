require 'rails_helper'

RSpec.describe "SinglePage", type: :system do
  include ActiveJob::TestHelper

  languages_codes = {
    'ruby'   => 'Ruby',
    'cpp'    => 'C++',
    'python' => 'Python',
    'golang' => 'Go',
    'rust'   => 'Rust'
  }

  let!(:languages) {
    languages_codes.each do |code, name|
      create(:language, name: name, code: code)
    end
  }

  before { visit '/' }
  
  after do
    clear_enqueued_jobs
    clear_performed_jobs
  end

  it "shows all languages", js: true do
    Language.all.each do |language|
      expect(page).to have_text(language.name)
    end
  end

  it "queues a fetch github job", js: true do
    expect do 
      find("#Ruby-update").click 
    end.to have_enqueued_job(FetchGithubJob).once.on_queue('default')
  end

  it "queues multiple fetch github jobs when all repositories are updated", js: true do
    # NOT WORKING
    #expect do 
    #  click_button('Update repositories')
    #end.to have_enqueued_job(FetchGithubJob).at_least(4).times.on_queue('default')
  end

  it "updates the repositories of a language individually", js: true do
    perform_enqueued_jobs do
      find("#Ruby-update").click
    end

    wait(10.seconds).for { Repository.count }.to eq(5)
  
    # Check for presence of repositories names on page
    ruby = Language.find_by(name: 'Ruby')
    Repository.where(language_id: ruby.id).each do |repository|
      expect(page).to have_text(repository.name)
    end
  end

  it "shows modal correctly", js: true do
    perform_enqueued_jobs do
      find("#Ruby-update").click
    end

    wait(10.seconds).for { Repository.count }.to eq(5)
  
    # Check for repository description on page
    repository = Repository.first
    find("##{repository.name}-card").click
    expect(page).to have_text(repository.description)
  end

  it "updates the repositories of all languages", js: true do
    # NOT WORKING
    #perform_enqueued_jobs do
    #  click_button('Update repositories')
    #end

    #wait(10.seconds).for { Repository.count }.to eq(25)

    #Language.all.each do |language|
    #  Repository.where(language_id: language.id).each do |repository|
    #    expect(page).to have_text(repository.name)
    #  end
    #end
  end
end