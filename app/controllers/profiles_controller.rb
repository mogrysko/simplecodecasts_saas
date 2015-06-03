class ProfilesController < ApplicationController
  def new
    @user = User.find(params[:user_id])
    @variable = params[:hello]
    @profile = @user.build_profile
  end
end
