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

ActiveRecord::Schema.define(version: 2020_05_20_104252) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "owners", force: :cascade do |t|
    t.string "github_login"
    t.string "avatar_url"
    t.string "github_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "repositories", force: :cascade do |t|
    t.bigint "github_id"
    t.string "name"
    t.text "description"
    t.datetime "creation_date"
    t.string "language"
    t.integer "forks_count"
    t.integer "stargazers_count"
    t.integer "open_issues_count"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "owner_id"
    t.string "github_url"
    t.index ["owner_id"], name: "index_repositories_on_owner_id"
  end

  add_foreign_key "repositories", "owners"
end
