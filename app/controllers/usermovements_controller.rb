class UsermovementsController < ApplicationController

	include UsermovementsHelper

	# Ensure current user is the owner of the movement and the movement exists
	before_action :check_user
	# Allow user to create new movements, #index carries out its own check
	skip_before_action :check_user, only: [:index, :new, :create]

	def index
		@usermovements = Usermovement.all.where(user: current_user)
		respond_to do |format|
			format.html { render :index }
			format.json { render json: @usermovements }
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
			render json: @usermovement, status: 201	
		else
			render :new
		end	
	end

	def show
		set_usermovement
		respond_to do |format|
			format.html { render :show }
			format.json { render json: @usermovement }
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
			redirect_to user_path(current_user)
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
