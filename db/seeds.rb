# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

generate_data = ->(data) { String.new(Faker::Music.send(data)).concat(", ", Faker::Music.send(data)) }

20.times do
  Band.create(
      name: Faker::Music.unique.band,
      genres: generate_data.call(:genre),
      albums: generate_data.call(:album)
  )
end
