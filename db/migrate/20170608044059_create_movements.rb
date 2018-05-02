class CreateMovements < ActiveRecord::Migration[5.1]
  def change
    create_table :movements do |t|
    	t.string :name
    	t.string :movement_type
    	t.integer :quantity
    	t.integer :owner_id
      t.timestamps null: false
    end
  end
end
