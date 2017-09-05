class UsermovementsController < ApplicationController

	include UsermovementsHelper

	# Ensure current user is the owner of the movement and the movement exists
	before_action :check_user
	# Allow user to create new movements, #index carries out its own check
	skip_before_action :check_user, only: [:index, :new, :create]

	def index
		if params[:user_id] == current_user.id.to_s
			# Selects only movements belonging to the current user and alphabetizes the returned list
			@usermovements = User.find_by(id: params[:user_id]).usermovements.sort_by {|move| move.name.downcase}
		else
			redirect_to user_usermovements_path(current_user), notice: "Movements not found"	
		end		
	end

	def new
		@usermovement = Usermovement.new(user_id: params[:user_id])
		set_user
		set_movement
	end

	def create
		@usermovement = Usermovement.new(usermovement_params)
		set_user
		set_movement
		if @usermovement.save
			move = Admin::Movement.all.find_by(name: @usermovement.name)
			# Assign a movement type to the users movement
			@usermovement.cftype = move.movement_type
			@usermovement.save
			# Calls to #update_pr if PR is true to ensure only one PR for that type of movement exists
			if @usermovement.pr == true
				update_pr(@usermovement)
			end	
			redirect_to user_usermovement_path(current_user, @usermovement)
		else
			render :new
		end		
	end

	def show
		if set_usermovement 
			set_usermovement
		else
			redirect_to user_usermovements_path(current_user), notice: "Movement not found"
		end			
	end

	def edit
		set_usermovement
		set_user
		set_movement
	end

	def update
		set_user
		set_movement
		set_usermovement
		if @usermovement.update(usermovement_params)
			# Calls to #update_pr if PR is true to ensure only one PR for that type of movement exists
			if @usermovement.pr == true
				update_pr(@usermovement)
			end	
			redirect_to user_usermovement_path(current_user, @usermovement)
		else
			render :edit
		end		
	end

	def destroy
		set_usermovement.destroy
		respond_to do |format|
			format.html {redirect_to user_usermovements_path(current_user), notice: "Movement was successfully deleted"}
		end
	end

	private

	def set_user
		@user = current_user
	end

	def set_movement
		@movements = Admin::Movement.all
	end

	def set_usermovement
		@usermovement = Usermovement.find_by(id: params[:id])
	end	

	def usermovement_params
		params.require(:usermovement).permit(:name, :date, :result, :cftype, :pr, :user_id, :comment)
	end
end
