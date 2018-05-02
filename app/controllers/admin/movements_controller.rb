class Admin::MovementsController < ApplicationController

	# Only allows the users who are owners to access the actions
	before_action :restrict_access, only: [:new, :create, :edit, :show, :update, :destroy]

	def index
		@movements = Admin::Movement.all.sort_by {|move| move.name.downcase}
		@user = current_user
		# redirect_to admin_movements_path
		# respond_to do |format|
		# 	format.js { render layout: false, serializer: Admin::MovementSerializer }
		# end
	end

	def new
		@movement = Admin::Movement.new
		@user = current_user
	end

	def create
		@user = current_user
		@movement = Admin::Movement.new(movement_params)
		@movement.owner_id = current_user.id
		if @movement.save
			redirect_to admin_movement_path(@movement)
		else
			render :new
		end		
	end

	def show
		set_movement
	end

	def edit
		set_movement
		
	end

	def update
		set_movement
		if @movement.update(movement_params)
			redirect_to admin_movement_path(@movement)
		else
			render :edit
		end		
	end

	def destroy
		set_movement.destroy
		respond_to do |format|
			format.html {redirect_to admin_movements_path, notice: "Movement was successfully deleted"}
		end	
	end

	private

	def set_movement
		@movement = Admin::Movement.find(params[:id])
	end

	def movement_params
		params.require(:admin_movement).permit(:name, :movement_type, :quantity, :owner_id)
	end
end
