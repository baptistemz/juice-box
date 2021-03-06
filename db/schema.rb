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

ActiveRecord::Schema.define(version: 20180405193912) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "connections", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_connections_on_room_id"
    t.index ["user_id"], name: "index_connections_on_user_id"
  end

  create_table "contributions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_contributions_on_room_id"
    t.index ["user_id"], name: "index_contributions_on_user_id"
  end

  create_table "libraries", force: :cascade do |t|
    t.bigint "user_id"
    t.index ["user_id"], name: "index_libraries_on_user_id"
  end

  create_table "library_musics", force: :cascade do |t|
    t.bigint "library_id"
    t.bigint "music_id"
    t.string "state"
    t.integer "waiting_list_position"
    t.index ["library_id"], name: "index_library_musics_on_library_id"
    t.index ["music_id"], name: "index_library_musics_on_music_id"
  end

  create_table "library_player_musics", force: :cascade do |t|
    t.bigint "library_id"
    t.bigint "library_music_id"
    t.bigint "music_id"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "playlist_music_id"
    t.index ["library_id"], name: "index_library_player_musics_on_library_id"
    t.index ["library_music_id"], name: "index_library_player_musics_on_library_music_id"
    t.index ["music_id"], name: "index_library_player_musics_on_music_id"
    t.index ["playlist_music_id"], name: "index_library_player_musics_on_playlist_music_id"
  end

  create_table "musics", force: :cascade do |t|
    t.string "song"
    t.string "whole_name"
    t.string "provider"
    t.string "music_key"
    t.bigint "artist_id"
    t.index ["artist_id"], name: "index_musics_on_artist_id"
  end

  create_table "playlist_musics", force: :cascade do |t|
    t.bigint "playlist_id"
    t.bigint "music_id"
    t.integer "waiting_list_position"
    t.index ["music_id"], name: "index_playlist_musics_on_music_id"
    t.index ["playlist_id"], name: "index_playlist_musics_on_playlist_id"
  end

  create_table "playlists", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.boolean "public"
    t.index ["user_id"], name: "index_playlists_on_user_id"
  end

  create_table "room_musics", force: :cascade do |t|
    t.bigint "room_id"
    t.bigint "music_id"
    t.bigint "user_id"
    t.integer "waiting_list_position"
    t.string "status"
    t.index ["music_id"], name: "index_room_musics_on_music_id"
    t.index ["room_id"], name: "index_room_musics_on_room_id"
    t.index ["user_id"], name: "index_room_musics_on_user_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.boolean "playing"
    t.integer "contributors_number"
    t.bigint "user_id"
    t.integer "transition_speed", default: 10
    t.integer "connected_stranger_number", default: 0
    t.index ["user_id"], name: "index_rooms_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "username"
    t.string "profile_picture"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "persist_allow_password_change", default: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "connections", "rooms"
  add_foreign_key "connections", "users"
  add_foreign_key "contributions", "rooms"
  add_foreign_key "contributions", "users"
  add_foreign_key "libraries", "users"
  add_foreign_key "library_musics", "libraries"
  add_foreign_key "library_musics", "musics"
  add_foreign_key "library_player_musics", "libraries"
  add_foreign_key "library_player_musics", "library_musics"
  add_foreign_key "library_player_musics", "musics"
  add_foreign_key "library_player_musics", "playlist_musics"
  add_foreign_key "playlist_musics", "musics"
  add_foreign_key "playlist_musics", "playlists"
  add_foreign_key "playlists", "users"
  add_foreign_key "room_musics", "musics"
  add_foreign_key "room_musics", "rooms"
  add_foreign_key "rooms", "users"
end
