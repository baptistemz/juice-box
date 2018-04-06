import _ from 'lodash';
import {
  GOT_PLAYLISTS,
  GOT_PLAYLIST_MUSICS,
  MUSIC_ADDED_TO_PLAYLIST,
  MUSIC_DELETED_FROM_PLAYLIST,
  PLAYLIST_CREATED,
  EMPTY_LIBRARY_PLAYER,
  MUSIC_ADDED_TO_LIBRARY_PLAYER,
  UPDATED_LIBRARY_PLAYER_MUSIC
} from '../actions/types';

const INITIAL_STATE = {
  ownerPlaylists: [],
  publicPlaylists: [],
  selectedPlaylistId: null,
  selectedPlaylistName: "",
  selectedPlaylistMusics: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_PLAYLISTS:{
      const { owner_playlists, public_playlists } = action.payload;
      return { ...state, ownerPlaylists: owner_playlists, publicPlaylists: public_playlists }
    }
    case PLAYLIST_CREATED:{
      const { playlist } = action.payload;
      console.log("state.ownerPlaylists", state.ownerPlaylists)
      console.log("[ ...state.ownerPlaylists, playlist ]", [ ...state.ownerPlaylists, playlist ])
      return { ...state, ownerPlaylists: [ ...state.ownerPlaylists, playlist ] }
    }
    case GOT_PLAYLIST_MUSICS:{
      const selectedPlaylistId = action.payload.playlist.id;
      const selectedPlaylistName = action.payload.playlist.name;
      return { ...state, selectedPlaylistId, selectedPlaylistName, selectedPlaylistMusics: action.payload.playlist_musics }
    }
    case MUSIC_ADDED_TO_PLAYLIST:{
      console.log("reducer", action.payload)
      const { owner_playlists, public_playlists } = action.payload;
      return { ...state, ownerPlaylists: owner_playlists, publicPlaylists: public_playlists }
    }
    case MUSIC_DELETED_FROM_PLAYLIST:{
      const index = _.findIndex(state.selectedPlaylistMusics, {id: action.payload.id});
      const selectedPlaylistMusics = [ ...state.selectedPlaylistMusics.slice(0, index), ...state.selectedPlaylistMusics.slice(index + 1) ];
      return { ...state, selectedPlaylistMusics };
    }
    case EMPTY_LIBRARY_PLAYER:{
      const selectedPlaylistMusics = []
      state.selectedPlaylistMusics.map(music => {
        music.playing ? selectedPlaylistMusics.push({ ...music, playing: null }) : selectedPlaylistMusics.push(music)
      })
      return { ...state, selectedPlaylistMusics }
    }
    case MUSIC_ADDED_TO_LIBRARY_PLAYER:{
      const playlistMusicId = action.payload.playlist_music_id
      let selectedPlaylistMusics = state.selectedPlaylistMusics
      if(playlistMusicId){
        const selectedPlaylistMusicIndex = _.findIndex(state.selectedPlaylistMusics, {id: playlistMusicId});
        selectedPlaylistMusics = [ ...state.selectedPlaylistMusics.slice(0, selectedPlaylistMusicIndex), { ...state.selectedPlaylistMusics[selectedPlaylistMusicIndex], playing: true }, ...state.selectedPlaylistMusics.slice(selectedPlaylistMusicIndex + 1) ];
      }
      return { ...state, selectedPlaylistMusics }
    }
    case UPDATED_LIBRARY_PLAYER_MUSIC:{
      console.log("ACTION POINT PAYLOAD", action.payload)
      if(action.payload.status === "playing"){
        const endingMusicIndex = _.findIndex(state.selectedPlaylistMusics, { playing: true });
        let selectedPlaylistMusics = endingMusicIndex > -1 ? [ ...state.selectedPlaylistMusics.slice(0, endingMusicIndex), { ...state.selectedPlaylistMusics[endingMusicIndex], playing: false }, ...state.selectedPlaylistMusics.slice(endingMusicIndex + 1) ] : state.selectedPlaylistMusics;
        const startingMusicIndex = _.findIndex(state.selectedPlaylistMusics, { music_key: action.payload.music_key });
        selectedPlaylistMusics = startingMusicIndex > -1 ? [ ...selectedPlaylistMusics.slice(0, startingMusicIndex), { ...selectedPlaylistMusics[startingMusicIndex], playing: true }, ...selectedPlaylistMusics.slice(startingMusicIndex + 1) ] : selectedPlaylistMusics;
        return { ...state, selectedPlaylistMusics }
      }
      return state;
    }
    default:
      return state;
  }
}
