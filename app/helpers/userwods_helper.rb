
module UserwodsHelper

	# Ensure current user is the owner of the wod and the wod exists
	def check_user
		@userwod = Userwod.find_by(id: params[:id])
		@user = User.find_by(id: params[:user_id])
		if !@userwod || current_user.id != @userwod.user_id || @user.id != current_user.id
			flash[:notice] = "Unable to access"
			redirect_to user_userwods_path(current_user)
		end	
	end
end