class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.string :name
    	t.string :email
    	t.string :uid
    	t.string :password_digest
    	t.boolean :owner, default: false

      t.timestamps null: false
    end
  end
end
