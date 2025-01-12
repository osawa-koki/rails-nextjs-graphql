class CreateItems < ActiveRecord::Migration[8.0]
  def up
    return if table_exists?(:items)

    create_table :items do |t|
      t.string :name, null: false
      t.text :description
      t.decimal :price, precision: 10, scale: 2

      t.timestamps
    end
  end

  def down
    drop_table :items if table_exists?(:items)
  end
end
