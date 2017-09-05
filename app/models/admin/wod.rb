class Admin::Wod < ActiveRecord::Base

	belongs_to :owner, :class_name => "User"
	has_many :move_wods
	has_many :movements, through: :move_wods

	validates :title, :wod_type, :description, presence: true
	validates :title, uniqueness: true
	validates :wod_type, inclusion: {in: %w(time weight repetitions), message: "%{value} is not a valid type"}
	validates_associated :movements

	def movements_attributes=(movements)
		movements.each do |i, movement|
			movement = Admin::Movement.all.find_or_create_by(movement)
			self.movements << movement
		end	
	end
end
