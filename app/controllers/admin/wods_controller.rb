class Admin::WodsController < ApplicationController

	# Only allows the users who are owners to access the actions
	before_action :restrict_access, only: [:new, :create, :edit,  :show, :update, :destroy]

	def index
		# alphabetize the list of wods
		@wods = Admin::Wod.all
		respond_to do |format|
			format.html {render :index }
			format.json {render json: @wods }
		end
	end

	def new
		@wod = Admin::Wod.new
		@movement = @wod.movements.build
		@movement = @wod.movements.build
		set_movements
	end

	def create
		set_movements
		@wod = Admin::Wod.new(wod_params)
		@wod.owner_id = current_user.id
		if @wod.save
			redirect_to admin_wod_path(@wod)
		else
			render :new
		end		
	end

	def show
		set_wod
		@movements = @wod.movements
		respond_to do |format|
			format.html {render :show }
			format.json {render json: { wod: @wod, movements: @movements } }
		end
	end

	def edit
		set_movements
		set_wod
	end

	def update
		set_movements
		set_wod
		if @wod.update(wod_params)
			redirect_to user_path(current_user)
		else
			render :edit
		end		
	end

	def destroy
		set_wod.destroy
		respond_to do |format|
			format.html {redirect_to admin_wods_path, notice: "WOD was successfully deleted"}
		end	
	end

	private

	def set_movements
		@movements = Admin::Movement.all
	end

	def set_wod
		@wod = Admin::Wod.find(params[:id])
	end

	def wod_params
		params.require(:admin_wod).permit(:title, :wod_type, :description, movement_ids: [], movements_attributes: [:name, :movement_type, :quantity])
	end
end
