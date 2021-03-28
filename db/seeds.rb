# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

assembly = Language.create(name: "Assembly")
Language.create(name: "C")
Language.create(name: "JavaScript")
Language.create(name: "Python")
Language.create(name: "Ruby")

user = User.create(email: "example@example.com", password: "123123")

user.repositories.create(external_id: "3081286",
                         full_name: "dtrupenn/Tetris",
                         description: "A C implementation of Tetris using Pennsim through LC4",
                         url: "https://github.com/dtrupenn/Tetris",
                         language: assembly)
