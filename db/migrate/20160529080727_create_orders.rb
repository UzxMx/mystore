class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :status, null: false, default: 0

      t.string :receiver_name, null: false, default: ""
      t.string :receiver_phone, null: false, default: ""
      t.string :receiver_address, null: false, default: ""

      t.belongs_to :product, index: true, null: false
      t.integer :count, null: false, default: 0
      t.string :variants, null: false, default: ""

      t.timestamps null: false
    end
  end
end
