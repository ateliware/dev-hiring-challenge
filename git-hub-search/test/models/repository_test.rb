require 'test_helper'
require 'colorize'
require 'faker'

class RepositoryTest < ActiveSupport::TestCase
  # fixtures :repositories
  puts "\n******** ⚠️  Running Unit Tests for Repository ⚠️  *******\n".colorize(:yellow)
  repo = Repository.new()

  test "Should not save repo without name" do
    assert_not repo.save, "Repository shouldn't be created"
    puts "\n✅ Should not save a Repository without Name".colorize(:light_green)
  end

  test "Should not save repo without language" do
    assert_not repo.save, "Repository shouldn't be created"
    puts "\n✅ Should not save a Repository without Language".colorize(:light_green)
  end

  test "Should not save repo without Github URL" do
    assert_not repo.save, "Repository shouldn't be created"
    puts "\n✅ Should not save a Repository without Github URL".colorize(:light_green)
  end

  new_repo = Repository.new()
  new_repo.html_url         = Faker::Internet.url(host: 'github.com', path: '/rails')
  new_repo.description      = Faker::ProgrammingLanguage.creator
  new_repo.stargazers_count = Faker::Number.number(digits: 4)
  new_repo.language         = Faker::ProgrammingLanguage.name
  new_repo.watchers_count   = Faker::Number.number(digits: 5)
  new_repo.forks            = Faker::Number.number(digits: 3)
  new_repo.full_name        = Faker::Company.buzzword

  test "Should create an example Post" do
    assert new_repo.save, "Should create an sample repository"
    puts "\n✅ Should create a Repository Sample".colorize(:light_green)
  end

end
