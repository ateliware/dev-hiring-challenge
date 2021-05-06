# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_23_231329) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "repositories", id: :serial, force: :cascade do |t|
    t.string "node_id", null: false
    t.string "name", null: false
    t.string "full_name"
    t.boolean "private"
    t.json "owner"
    t.string "html_url", null: false
    t.string "description"
    t.date "created_at"
    t.date "updated_at"
    t.date "pushed_at"
    t.string "git_url"
    t.string "ssh_url"
    t.string "clone_url"
    t.string "svn_url"
    t.string "homepage"
    t.integer "size"
    t.string "language"
    t.integer "forks"
    t.json "license"
    t.integer "watchers"
    t.integer "stargazers_count"
    t.datetime "fetch_at", default: "2021-04-25 15:55:47", null: false
  end

end
