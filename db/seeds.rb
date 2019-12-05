require 'faker'
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end
25.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  User.create(f_name: first_name, l_name: last_name)
end
