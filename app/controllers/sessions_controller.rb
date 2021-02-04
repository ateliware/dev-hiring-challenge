class SessionsController < ApplicationController
  skip_before_action :authorized, only: %i[new create welcome]

  def create
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to '/repositories'
    else
      redirect_to '/login', notice: 'Email ou senha inválido.'
    end
  end

  def new; end

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end
end
