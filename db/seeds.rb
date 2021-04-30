# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Topic.find_or_create_by(name: 'ruby')
Topic.find_or_create_by(name: 'javascript')
Topic.find_or_create_by(name: 'python')
Topic.find_or_create_by(name: 'php')
Topic.find_or_create_by(name: 'C#')