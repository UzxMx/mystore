require 'test_helper'

class StoreControllerTest < ActionController::TestCase
  test "should get shoe" do
    get :shoe
    assert_response :success
  end

end
