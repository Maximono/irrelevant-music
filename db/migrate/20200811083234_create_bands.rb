class CreateBands < ActiveRecord::Migration[6.0]
  def change
    create_table :bands do |t|
      t.string :name
      t.string :genres
      t.string :albums

      t.timestamps
    end
  end
end
