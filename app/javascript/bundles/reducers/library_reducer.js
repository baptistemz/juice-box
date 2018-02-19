import {
  GOT_LIBRARY,
  ARTIST_UPDATED,
  SELECT_ARTIST,
  MUSIC_UPDATED,
  MUSIC_ADDED_TO_LIBRARY,
  MUSIC_DELETED_FROM_LIBRARY,
} from '../actions/types';

const INITIAL_STATE = {
    id: null,
    musics: [],
    artists: [],
    playlists: [],
    selectedArtist: null,
    selectedArtistMusics: []
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_LIBRARY:{
      const { id, playlists, musics, artists } = action.payload;
      return {...state, id, playlists, musics, artists }
    }
    case ARTIST_UPDATED:{
      const {  deleted_artist, new_artist, updated_musics } = action.payload;
      console.log("action.payload", action.payload)
      let artists = state.artists;
      const index = _.findIndex(artists, {id: new_artist.id});
      artists = [ ...state.artists.slice(0, index), new_artist, ...state.artists.slice(index + 1) ];
      if(deleted_artist){
        const toDeleteIndex = _.findIndex(artists, {id: deleted_artist.id});
        artists = [ ...artists.slice(0, toDeleteIndex), ...artists.slice(toDeleteIndex + 1) ];
      };
      let musics = state.musics;
      updated_musics.map((music) => {
        const index = _.findIndex(musics, {id: music.id});
        musics = [ ...state.musics.slice(0, index), music, ...state.musics.slice(index + 1) ];
      })
      console.log("musics", musics)
      console.log("artists", artists)
      return { ...state, musics , artists }
    }
    case MUSIC_UPDATED:{
      const music = action.payload;
      console.log("some", _.some(state.artists, music.artist));
      let artists = _.some(state.artists, music.artist) ? state.artists : [...state.artists, music.artist];
      if(action.formerArtistId && _.filter(state.musics, (m) =>{return m.artist.id === parseInt(action.formerArtistId)}).length < 2){
        const toDeleteIndex = _.findIndex(artists, {id: action.formerArtistId});
        artists = [ ...artists.slice(0, toDeleteIndex), ...artists.slice(toDeleteIndex + 1) ];
      }
      const index1 = _.findIndex(state.musics, {id: music.id});
      const musics = [ ...state.musics.slice(0, index1), music, ...state.musics.slice(index1 + 1) ];
      const index2 = _.findIndex(state.selectedArtistMusics, {id: music.id});
      const selectedArtistMusics = [ ...state.selectedArtistMusics.slice(0, index2), music, ...state.selectedArtistMusics.slice(index2 + 1) ];
      return { ...state, musics, selectedArtistMusics, artists }
    }
    case SELECT_ARTIST:{
      const selectedArtist = _.find(state.artists, {id: parseInt(action.payload)})
      const selectedArtistMusics = _.filter(state.musics, (m) =>{return m.artist.id === parseInt(action.payload)})
      console.log("selectedArtist", selectedArtist)
      console.log("state.musics", state.musics)
      console.log("selectedArtistMusics", selectedArtistMusics)
      return { ...state, selectedArtist, selectedArtistMusics }
    }
    case MUSIC_ADDED_TO_LIBRARY:{
      let artists = state.artists
      if(!_.find(state.artists, {id: action.payload.artist.id})){
        artists = [...state.artists, action.payload.artist];
      }
      return { ...state, musics:[ ...state.musics, action.payload], artists }
    }
    case MUSIC_DELETED_FROM_LIBRARY:{
      const index = _.findIndex(state.musics, {id: action.payload.id});
      const musics = [ ...state.musics.slice(0, index), ...state.musics.slice(index + 1) ];
      let selectedArtistMusics = state.selectedArtistMusics;
      const selectedArtistMusicsIndex = _.findIndex(selectedArtistMusics, {id: action.payload.id});
      console.log("selectedArtistMusicsIndex", selectedArtistMusicsIndex)
      if(selectedArtistMusics){
        selectedArtistMusics = [ ...state.selectedArtistMusics.slice(0, selectedArtistMusicsIndex), ...state.selectedArtistMusics.slice(selectedArtistMusicsIndex + 1) ];
        console.log("selectedArtistMusics", selectedArtistMusics)
      }
      console.log("_.some(musics, { artist: action.payload.artist })", _.some(musics, { artist: action.payload.artist }))
      let artists = state.artists;
      if(!_.some(musics, { artist: action.payload.artist })){
        const artistIndex = _.findIndex(state.artists, {id: action.payload.artist.id});
        console.log("artistIndex", artistIndex)
        artists = [ ...state.artists.slice(0, artistIndex), ...state.artists.slice(artistIndex + 1) ];
        console.log("artists", artists)
      }
      return { ...state, musics, artists, selectedArtistMusics }
    }

    default:
      return state;
  }
}
