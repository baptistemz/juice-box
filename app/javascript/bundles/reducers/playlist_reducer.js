import {
  GOT_PLAYLISTS,
  GOT_PLAYLIST_MUSICS,
  MUSIC_ADDED_TO_PLAYLIST,
  MUSIC_DELETED_FROM_PLAYLIST,
  PLAYLIST_CREATED,
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
      return { ...state, ownerPlaylists: owner_playlists, publicPlaylists: public_playlists}
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
      if(action.payload.playlist.id === state.selectedPlaylistId){
        return { ...state, selectedPlaylistMusics: [ ...state.selectedPlaylistMusics, action.payload ] }
      }
      return state
    }
    case MUSIC_DELETED_FROM_PLAYLIST:{
      const index = _.findIndex(state.selectedPlaylistMusics, {id: action.payload.id});
      const selectedPlaylistMusics = [ ...state.selectedPlaylistMusics.slice(0, index), ...state.selectedPlaylistMusics.slice(index + 1) ];
      return { ...state, selectedPlaylistMusics };
    }
    default:
      return state;
  }
}
