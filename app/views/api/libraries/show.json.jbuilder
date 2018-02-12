json.extract! @library, :id
json.musics @musics, partial: 'api/library_musics/library_music', as: :library_music
json.artists @artists, partial: 'api/artists/artist', as: :artist
json.playlists @playlists, partial: 'api/playlists/playlist', as: :playlist
