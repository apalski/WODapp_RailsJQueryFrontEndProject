class CreateUsermovements < ActiveRecord::Migration[5.1]
  def change
    create_table :usermovements do |t|
    	t.string :name
    	t.date :date
      t.string :cftype
      t.float :result, :precision => 2, :scale => 2
    	t.boolean :pr, default: false
      t.string :comment
    	t.integer :user_id
    	
      t.timestamps null: false
    end
  end
end
