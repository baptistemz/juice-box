import {
  GOT_PLAYLISTS,
  GOT_PLAYLIST_MUSICS
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
    case GOT_PLAYLIST_MUSICS:{
      const selectedPlaylistId = Number(action.id)
      const selectedPlaylistName = _.find(state.ownerPlaylists.concat(state.publicPlaylists), {id: selectedPlaylistId}).name
      return { ...state, selectedPlaylistId, selectedPlaylistName, selectedPlaylistMusics: action.payload }
    }
    default:
      return state;
  }
}
