	class UsersController < ApplicationController

	# Allow a new user to access the signin page and be created
	skip_before_action :require_signin, only: [:new, :create]
	# skip_before_action :restrict_access, only: [:new, :create]
	# Only allows a user to view and edit their own data
	before_action :user_own_data
	# Allow a new user to access the signin page and be created
	skip_before_action :user_own_data, only: [:new, :create]

	def index
		# Ensure only an owner can view all users
		if current_user.owner == true
			@users = User.all.sort_by {|user| user.name.downcase}
		else
			flash[:notice] = "You don't have permission for this page, see your box owner"
			redirect_to user_path(current_user)
		end
	end

	def new
		# If user already signed in don't let the access the sign up page
		if !current_user
			@user = User.new
		else
			redirect_to user_path(current_user), notice: "You are already signed in"
		end
	end

	def create
		@user = User.new(user_params)
		if @user.save
			session[:user_id] = @user.id
			redirect_to sessions_new_path
		else
		 	render :new
		end
	end

	def show
		set_user
		@usermovement = @user.usermovements.all.first
		@userwod = @user.userwods.all.first
    	@movement = Admin::Movement.all.first
    	@wod = Admin::Wod.all.first
	end

	def edit
		# Only allows a signed up user or an owner to edit their data
		# Facebook users don't have passwords and need an owner to edit their data
		if current_user.owner == true || current_user.uid.nil?
			set_user
		else
			flash[:notice] = "You must be password registered to edit your profile"
				redirect_to user_path(current_user)
		end
	end

	def update
		set_user
		if @user == current_user
			if @user.update(user_params)
				redirect_to user_path(@user)
			else
				render :edit
			end
		else
			# Allow edit of password and ownership by box owner
			if !params[:user][:password].nil?
				@user.update_attribute(:password, params[:user][:password])
			end
			@user.update_attribute(:owner, params[:user][:owner])
			redirect_to root_path
		end
	end

	def destroy
		set_user.destroy
		respond_to do |format|
			format.html {redirect_to users_path, notice: "User was successfully deleted"}
		end
	end

	private

	# Identifies if current user is the owner of the data being accessed
	def user_own_data
		if current_user.id.to_s != params[:id]
			if current_user.owner != true
				flash[:notice] = "You don't have permission for this page, see your box owner"
				redirect_to user_path(current_user)
			end
		end
	end

	def set_user
		@user = User.find(params[:id])
	end

	def user_params
		params.require(:user).permit(:name, :email, :uid, :password, :owner)
	end
end
