import _ from 'lodash';
import {
  GOT_LIBRARY,
  ARTIST_UPDATED,
  SELECT_ARTIST,
  MUSIC_UPDATED,
  MUSIC_ADDED_TO_LIBRARY,
  MUSIC_DELETED_FROM_LIBRARY,
  PLAYLIST_CREATED,
  MUSIC_ADDED_TO_LIBRARY_PLAYER,
  WAITING_LIST_ADDED_TO_LIBRARY_PLAYER,
  EMPTY_LIBRARY_PLAYER,
  LIBRARY_VOLUME_BALANCE_CHANGED,
  UPDATED_LIBRARY_PLAYER_MUSIC
} from '../actions/types';

const INITIAL_STATE = {
    id: null,
    musics: [],
    playerMusics: [],
    music_0: null,
    music_1: null,
    volume_balance: 0,
    hidden_player: 1,
    artists: [],
    playlists: [],
    selectedArtist: null,
    selectedArtistMusics: []
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_LIBRARY:{
      // console.log(" GOT_LIBRARY action.payload", action.payload)
      const { id, playlists, musics, artists } = action.payload;
      return {...state, id, playlists, musics, artists, music_0: null, music_1: null }
    }
    case PLAYLIST_CREATED:{
      const { playlist } = action.payload;
      return { ...state, playlists: [ ...state.playlists, playlist ] }
    }
    case ARTIST_UPDATED:{
      const {  deleted_artist, new_artist, updated_musics } = action.payload;
      // console.log("action.payload", action.payload)
      let artists = state.artists;
      const index = _.findIndex(artists, {id: new_artist.id});
      artists = [ ...state.artists.slice(0, index), new_artist, ...state.artists.slice(index + 1) ];
      if(deleted_artist){
        const toDeleteIndex = _.findIndex(artists, {id: deleted_artist.id});
        artists = [ ...artists.slice(0, toDeleteIndex), ...artists.slice(toDeleteIndex + 1) ];
      }
      let musics = state.musics;
      updated_musics.map((music) => {
        const index = _.findIndex(musics, {id: music.id});
        musics = [ ...state.musics.slice(0, index), music, ...state.musics.slice(index + 1) ];
      })
      // console.log("musics", musics)
      // console.log("artists", artists)
      return { ...state, musics , artists }
    }
    case MUSIC_UPDATED:{
      const music = action.payload;
      // console.log("action", action)
      let artists = _.some(state.artists, music.artist) ? state.artists : [...state.artists, music.artist];
      if(action.formerArtistId && action.formerArtistId !== music.artist.id && _.filter(state.musics, (m) =>{return m.artist.id === parseInt(action.formerArtistId)}).length < 2){
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
      const selectedArtistMusics = _.filter(state.musics, (m) =>{return m.artist && m.artist.id === parseInt(action.payload)})
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
      // console.log("selectedArtistMusicsIndex", selectedArtistMusicsIndex)
      if(selectedArtistMusics){
        selectedArtistMusics = [ ...state.selectedArtistMusics.slice(0, selectedArtistMusicsIndex), ...state.selectedArtistMusics.slice(selectedArtistMusicsIndex + 1) ];
        // console.log("selectedArtistMusics", selectedArtistMusics)
      }
      // console.log("_.some(musics, { artist: action.payload.artist })", _.some(musics, { artist: action.payload.artist }))
      let artists = state.artists;
      if(!_.some(musics, { artist: action.payload.artist })){
        const artistIndex = _.findIndex(state.artists, {id: action.payload.artist.id});
        // console.log("artistIndex", artistIndex)
        artists = [ ...state.artists.slice(0, artistIndex), ...state.artists.slice(artistIndex + 1) ];
        // console.log("artists", artists)
      }
      return { ...state, musics, artists, selectedArtistMusics }
    }
    case EMPTY_LIBRARY_PLAYER:{
      const musics = []
      state.musics.map(music => {
        music.playing ? musics.push({ ...music, playing: null }) : musics.push(music)
      })
      const selectedArtistMusics = []
      state.selectedArtistMusics.map(music => {
        music.playing ? selectedArtistMusics.push({ ...music, playing: null }) : selectedArtistMusics.push(music)
      })
      return { ...state, playerMusics: [{}], musics, selectedArtistMusics, music_0: null, music_1: null, volume_balance: 0, hidden_player: 1 }
    }
    case MUSIC_ADDED_TO_LIBRARY_PLAYER:{
      const libraryMusicId = action.payload.library_music_id
      let musics = state.musics
      let selectedArtistMusics = state.selectedArtistMusics
      // console.log("action.payload", action.payload)
      if(libraryMusicId){
        const musicIndex = _.findIndex(state.musics, {id: libraryMusicId});
        const selectedArtistMusicIndex = _.findIndex(state.selectedArtistMusics, {id: libraryMusicId});
        selectedArtistMusics = [ ...state.selectedArtistMusics.slice(0, selectedArtistMusicIndex), { ...state.selectedArtistMusics[selectedArtistMusicIndex], playing: true }, ...state.selectedArtistMusics.slice(selectedArtistMusicIndex + 1) ];
        musics = [ ...state.musics.slice(0, musicIndex), { ...state.musics[musicIndex], playing: true }, ...state.musics.slice(musicIndex + 1) ];
      }
      return {
        ...state,
        musics,
        selectedArtistMusics,
        [`music_${state.hidden_player === 0 ? 1 : 0}`]: action.payload
      }
    }
    case WAITING_LIST_ADDED_TO_LIBRARY_PLAYER:{
      console.log("WAITING_LIST_ADDED_TO_LIBRARY_PLAYER action.payload", action.payload)
      return {
        ...state,
        playerMusics: action.payload,
        [`music_${state.hidden_player}`]: action.payload[0]
      };
    }
    case LIBRARY_VOLUME_BALANCE_CHANGED:{
      console.log("LIBRARY_VOLUME_BALANCE_CHANGED", action.payload)
      const variation = action.payload.music_number === 1 ? action.payload.amount : (0 - action.payload.amount)
      return { ...state, volume_balance: state.volume_balance + variation }
    }
    case UPDATED_LIBRARY_PLAYER_MUSIC:{
      console.log("ACTION POINT PAYLOAD", action.payload)
      if(action.payload.status === "playing"){
        const playerMusics = state.playerMusics;
        playerMusics.shift()
        const musicIndex = _.findIndex(state.musics, { playing: true });
        console.log("MUSIC_STARTED in condition /  musicIndex", musicIndex)
        const musics = musicIndex > -1 ? [ ...state.musics.slice(0, musicIndex), { ...state.musics[musicIndex], playing: false }, { ...state.musics[musicIndex + 1], playing: true }, ...state.musics.slice(musicIndex + 2) ] : state.musics;
        console.log("MUSIC_STARTED in condition /  musics", musics)
        return { ...state, playerMusics, musics, hidden_player: state.hidden_player === 1 ? 0 : 1, [`music_${state.hidden_player}`]: action.payload }
      }
      if(action.payload.status === "archived"){
        const new_music = _.size(state.playerMusics) === 0 ? state[`music_${state.hidden_player === 1 ? 0 : 1}`] : state.playerMusics[0];
        console.log("MUSIC_ENDED new_music", new_music)
        console.log("MUSIC_ENDED state.playerMusics", state.playerMusics)
        console.log("MUSIC_ENDED music playing", state[`music_${state.hidden_player === 1 ? 0 : 1}`])
        return { ...state, [`music_${state.hidden_player}`]: state.playerMusics[0], volume_balance: state.hidden_player === 1 ? 0 : 1 }
      }
      return state;
    }

    default:
      return state;
  }
}
