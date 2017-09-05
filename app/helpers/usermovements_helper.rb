
module UsermovementsHelper

	# Ensure current user is the owner of the movement and the movement exists
	def check_user
		@usermovement = Usermovement.find_by(id: params[:id])
		@user = User.find_by(id: params[:user_id])
		if !@usermovement || current_user.id != @usermovement.user_id || @user.id != current_user.id
			flash[:notice] = "Unable to access"
			redirect_to user_usermovements_path(current_user)
		end	
	end
end	