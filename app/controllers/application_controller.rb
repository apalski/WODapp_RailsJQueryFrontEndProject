
class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
 	# For APIs, you may want to use :null_session instead.

	protect_from_forgery with: :exception

	before_action :require_signin

	include ApplicationHelper

	def welcome
		@user = current_user
	end

	private

	# Restrict access to welcome page and app to signed in users
	def require_signin
		unless current_user
			flash[:notice] = "You must be signed in to use WODapp"
			redirect_to new_user_path
		end	
	end
end