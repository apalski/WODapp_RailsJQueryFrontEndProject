class User < ActiveRecord::Base

	has_many :wods
	has_many :movements
	has_many :usermovements
	has_many :userwods

	has_secure_password

	validates :name, :email, presence: true
	validates :name,:email, uniqueness: true
	validates :password, length: {minimum: 6}

	# Creates a new Facebook or Github user if they don't already exist
	def self.create_with_omniauth(auth_hash)
	    user = User.find_or_create_by(uid: auth_hash["uid"])
	    user.email = auth_hash["info"]["email"]
	    user.password = SecureRandom.base64(10)
	    user.name = auth_hash["info"]["name"]
	    if User.exists?(user)
	    	user
	    else
	    	user.save!
	    	user
	    end		
  	end
end
