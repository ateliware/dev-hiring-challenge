# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_05_033200) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "repos", force: :cascade do |t|
    t.integer "gh_id"
    t.string "gh_node_id"
    t.string "name"
    t.string "full_name"
    t.string "html_url"
    t.text "description"
    t.string "language"
    t.string "homepage"
    t.datetime "repo_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "stargazers_count"
    t.integer "watchers_count"
    t.integer "forks_count"
    t.integer "open_issues_count"
    t.integer "subscribers_count"
    t.string "owner_avatar_url"
    t.string "owner_html_url"
    t.text "readme_content"
    t.index ["gh_id"], name: "index_repos_on_gh_id", unique: true
  end

end
