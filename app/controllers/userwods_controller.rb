class UserwodsController < ApplicationController

	include UserwodsHelper

	# Ensure current user is the owner of the wod and the wod exists
	before_action :check_user
	# Allow user to create new wods, #index carries out its own check
	skip_before_action :check_user, only: [:index, :new, :create]

	def index
		@userwods = Userwod.all.where(user: current_user)
		respond_to do |format|
			format.html { render :index }
			format.json { render json: @userwods }
		end
	end

	def new
		@owner_wods = Admin::Wod.all.sort_by {|wod| wod.title.downcase}
		@userwod = Userwod.new(user_id: params[:user_id])
		set_user
		set_wod
	end

	def create
		@userwod = Userwod.new(userwod_params)
		set_user
		set_wod
		if @userwod.save
			render json: @userwod, status: 201
		else
			render :new
		end		
	end

	def show
		set_userwod
		respond_to do |format|
			format.html { render :show }
			format.json { render json: @userwod }
		end		
	end

	def edit
		set_userwod
		set_user
		set_wod
	end

	def update
		set_user
		set_wod
		set_userwod
		if @userwod.update(userwod_params)
			redirect_to user_path(current_user)
		else
			render :edit
		end		
	end

	def destroy
		set_userwod.destroy
		respond_to do |format|
			format.html {redirect_to user_userwods_path(current_user), notice: "WOD was successfully deleted"}
		end	
	end

	private

	def set_wod
		@wods = Admin::Wod.all
	end

	def set_user
		@user = current_user
	end

	def set_userwod
		@userwod = Userwod.find(params[:id])
	end

	def userwod_params
		params.require(:userwod).permit(:name, :date, :result, :cftype, :pr, :user_id)
	end
end


