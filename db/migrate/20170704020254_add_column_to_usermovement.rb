class AddColumnToUsermovement < ActiveRecord::Migration
  def change
    add_column :usermovements, :comment, :string
  end
end
