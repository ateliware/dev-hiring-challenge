require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get ruby" do
    get home_ruby_url
    assert_response :success
  end

  test "should get python" do
    get home_python_url
    assert_response :success
  end

  test "should get elixir" do
    get home_elixir_url
    assert_response :success
  end

  test "should get nodejs" do
    get home_nodejs_url
    assert_response :success
  end

  test "should get aspnet" do
    get home_aspnet_url
    assert_response :success
  end
end
