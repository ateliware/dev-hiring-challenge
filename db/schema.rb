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

ActiveRecord::Schema.define(version: 2021_01_22_074227) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "btree_gin"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "good_jobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "queue_name"
    t.integer "priority"
    t.jsonb "serialized_params"
    t.datetime "scheduled_at"
    t.datetime "performed_at"
    t.datetime "finished_at"
    t.text "error"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["queue_name", "scheduled_at"], name: "index_good_jobs_on_queue_name_and_scheduled_at", where: "(finished_at IS NULL)"
    t.index ["scheduled_at"], name: "index_good_jobs_on_scheduled_at", where: "(finished_at IS NULL)"
  end

  create_table "importers", force: :cascade do |t|
    t.jsonb "response"
    t.datetime "finished_at"
  end

  create_table "owners", force: :cascade do |t|
    t.string "login"
    t.string "avatar_url"
    t.string "html_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["login"], name: "index_owners_on_login", unique: true
  end

  create_table "repositories", force: :cascade do |t|
    t.integer "github_repo_id", null: false
    t.string "name", null: false
    t.string "full_name", null: false
    t.string "html_url", null: false
    t.string "language", null: false
    t.text "description"
    t.integer "stargazers_count", default: 0
    t.integer "watchers_count", default: 0
    t.integer "forks_count", default: 0
    t.integer "open_issues_count", default: 0
    t.integer "score", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "importer_id"
    t.bigint "owner_id"
    t.integer "position"
    t.index ["github_repo_id"], name: "index_repositories_on_github_repo_id"
    t.index ["importer_id"], name: "index_repositories_on_importer_id"
    t.index ["language"], name: "index_repositories_on_language"
    t.index ["owner_id"], name: "index_repositories_on_owner_id"
    t.index ["position"], name: "index_repositories_on_position"
    t.index ["stargazers_count", "watchers_count", "forks_count", "open_issues_count"], name: "index_repositories_uniqueness", unique: true
  end

  add_foreign_key "repositories", "importers"
  add_foreign_key "repositories", "owners"
end
