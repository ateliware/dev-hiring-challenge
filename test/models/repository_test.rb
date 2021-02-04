require 'test_helper'

class RepositoryTest < ActiveSupport::TestCase
  test 'should not save repository without name' do
    repository = Repository.new
    repository.html_url = 'htmlUrl'
    repository.description = 'descrição'
    repository.owner = 'proprietário'
    assert_not repository.save, 'Saved repository without name'
  end

  test 'should not save repository without url' do
    repository = Repository.new
    repository.name = 'repositorio'
    repository.description = 'descrição'
    repository.owner = 'proprietário'
    repository.language = 'language'
    assert_not repository.save, 'Saved repository without url'
  end

  test 'should not save repository without owner' do
    repository = Repository.new
    repository.name = 'repositorio'
    repository.description = 'descrição'
    repository.html_url = 'htmlUrl'
    repository.language = 'language'
    assert_not repository.save, 'Saved repository without owner'
  end

  test 'should not save repository without language' do
    repository = Repository.new
    repository.name = 'repositorio'
    repository.html_url = 'htmlUrl'
    repository.owner = 'proprietário'
    repository.description = 'descrição'
    assert_not repository.save, 'Saved repository without language'
  end

  test 'find all' do
    assert_equal 2, repositories.length, 'Failed to find all repositories'
  end

  test 'find all by name' do
    assert_equal 2, repositories(:one, :two).length
  end

  test 'should not save a repository without user' do
    repository = Repository.create(name: 'nome', html_url: 'htmlUrl', owner: 'proprietário',
                                   description: 'descrição', language: 'language')
    assert_not repository.save
  end
  test 'should not save repository twice for the same user' do
    @user = User.first
    @user.repositories.create(name: 'RiverRaid', html_url: 'url_two', description: 'desc_two',
                              owner: 'owner_two', language: 'lang_two')
    @user.save
    @user.repositories.create(name: 'RiverRaid', html_url: 'url_two', description: 'desc_two',
                              owner: 'owner_two', language: 'lang_two')

    assert_not @user.save
  end
end
