module AuthorizationHelper
  def auth_tokens_for_user(user)
    post '/login/',
         params: { email: user.email, password: user.password },
         as: :json
    response.headers
  end
end
