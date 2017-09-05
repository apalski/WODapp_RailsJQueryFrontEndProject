
class SessionsController < ApplicationController

	# Allow a user to sign in and sign up
	skip_before_action :require_signin, only: [:new, :create]

	def new
		# Don't let an already signed in user access sign up page
		if current_user
			redirect_to user_path(current_user), notice: "You are already signed in"
		end	
	end
	
	def create 
		# Create new session for a Facebook or Github user   
		if auth_hash = request.env['omniauth.auth']
			@user = User.create_with_omniauth(auth_hash)
			session[:user_id] = @user.id
			redirect_to root_path
		else
			# Create a new session for a signed up user with password
			@user = User.find_by(:name => params[:user][:name])
			if @user && @user.authenticate(params[:user][:password])
				session[:user_id] = @user.id
				redirect_to root_path
			else
				flash[:notice] = "You couldn't be signed in, please check your name and password and try again"
				redirect_to sessions_new_path
			end
		end
	end

	def destroy
		session.clear
		respond_to do |format|
			format.html {redirect_to sessions_new_path, notice: "You are signed out"}
		end	
	end
end