# frozen_string_literal: true

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

ActiveRecord::Schema.define(version: 20_191_129_165_946) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'pomodoros', force: :cascade do |t|
    t.bigint 'project_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.date 'completed_at'
    t.index ['project_id'], name: 'index_pomodoros_on_project_id'
  end

  create_table 'projects', force: :cascade do |t|
    t.bigint 'user_id'
    t.string 'name'
    t.integer 'estimated_pomodoro'
    t.string 'color'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['user_id'], name: 'index_projects_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'given_name'
    t.string 'family_name'
    t.string 'email'
    t.string 'picture'
    t.string 'provider_user_id'
    t.string 'provider'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'access_id'
    t.index ['access_id'], name: 'index_users_on_access_id'
  end
end
