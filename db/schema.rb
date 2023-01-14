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

ActiveRecord::Schema[7.0].define(version: 2023_01_14_224041) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "github_api_models", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "languages", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug", default: "", null: false
  end

  create_table "repositories", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "node_id"
    t.integer "github_id"
    t.string "full_name"
    t.integer "stars"
    t.string "url"
    t.integer "forks"
    t.integer "open_issues"
    t.string "license"
    t.datetime "origin_created_at"
    t.string "origin_updated_at"
    t.string "topics", default: [], array: true
    t.bigint "language_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["github_id"], name: "index_repositories_on_github_id", unique: true
    t.index ["language_id"], name: "index_repositories_on_language_id"
  end

  add_foreign_key "repositories", "languages"
end
