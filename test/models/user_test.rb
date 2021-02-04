require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'should not save user without email' do
    user = User.new
    assert_not user.save, 'Saved the user without a email'
  end
  test 'should not save user without password' do
    user = User.new
    user.email = 'test'
    assert_not user.save, 'Saved the user without a password'
  end
  test 'should not save user with same email' do
    user = User.new
    user.email = 'email'
    user.save
    user2 = User.new
    user2.email = 'email'
    assert_not user.save, 'Saved the user with duplicated email'
  end
end
