# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_21_205605) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "repositories", id: false, force: :cascade do |t|
    t.integer "id"
    t.string "node_id"
    t.string "name"
    t.string "full_name"
    t.string "description"
    t.integer "stargazers_count"
    t.integer "watchers_count"
    t.string "language"
    t.integer "forks_count"
    t.integer "open_issues_count"
  end

end
