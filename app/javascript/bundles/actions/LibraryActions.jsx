import axios from 'axios';
import { setNextHeaders } from '../utils/tokenManagement';
import { errorHandling } from '../utils/errorHandling';
import { toastr } from 'react-redux-toastr';
import {
  GOT_LIBRARY,
  ARTIST_UPDATED,
  SELECT_ARTIST,
  MUSIC_UPDATED,
  MUSIC_ADDED_TO_LIBRARY,
  MUSIC_ADDED_TO_PLAYLIST,
  MUSIC_DELETED_FROM_LIBRARY,
  MUSIC_DELETED_FROM_PLAYLIST,
  EMPTY_LIBRARY_PLAYER,
  MUSIC_ADDED_TO_LIBRARY_PLAYER,
  WAITING_LIST_ADDED_TO_LIBRARY_PLAYER,
  LIBRARY_VOLUME_BALANCE_CHANGED,
  UPDATED_LIBRARY_PLAYER_MUSIC
} from './types';

// API CALLS

export function fetchLibrary(id){
  return dispatch => {
    axios.get(`/api/libraries/${id}`)
      .then(response => {
        // console.log("library response", response)
        setNextHeaders(response.headers)
        dispatch(gotLibrary(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
}

export function createArtist(id, name){
  return dispatch => {
    axios.put(`/api/artists/${id}`, { name })
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(artistUpdated(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
}

export function updateArtist(id, name){
  return dispatch => {
    axios.put(`/api/artists/${id}`, { name })
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(artistUpdated(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
}

export function updateMusic(id, song, artist_name, formerArtistId){
  return dispatch => {
    axios.put(`/api/musics/${id}`, { song, artist_name })
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(musicUpdated(response.data, formerArtistId));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
}

export function addMusicToLibrary(libraryId, params){
  return dispatch => {
    axios.post(`/api/libraries/${libraryId}/library_musics`, params)
      .then((response) =>{
        toastr.success(`${response.data.whole_name} added to your library`);
        dispatch(musicAddedToLibrary(response.data));
        setNextHeaders(response.headers)
      }).catch((error)=>{
        errorHandling(error)
      })
  };
}

export function addMusicToPlaylist(playlistId, music){
  // console.log("addMusicToPlaylist", playlistId, music)
  return dispatch => {
    axios.post(`/api/playlists/${playlistId}/playlist_musics`, music)
      .then(response => {
        console.log("MUSIC", music)
        setNextHeaders(response.headers)
        toastr.success(`${music.song} added to ${response.data.playlist.name}`);
        dispatch(musicAddedToPlaylist(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
}

export function deleteMusicFromLibrary(libraryId, musicId){
  // console.log("deleteMusicFromLibrary", libraryId, musicId)
  return dispatch => {
    axios.delete(`/api/libraries/${libraryId}/library_musics/${musicId}`)
      .then((response) =>{
        toastr.success(`${response.data.whole_name} deleted from your library`);
        dispatch(musicDeletedFromLibrary(response.data));
        setNextHeaders(response.headers)
      }).catch((error)=>{
        errorHandling(error)
      })
  };
}

export function deleteMusicFromPlaylist(playlistId, musicId){
  // console.log("deleteMusicFromPlaylist", playlistId, musicId)
  return dispatch => {
    axios.delete(`/api/playlists/${playlistId}/playlist_musics/${musicId}`)
      .then(response => {
        setNextHeaders(response.headers)
        toastr.success(`${response.data.whole_name} deleted from ${response.data.playlist.name}`);
        dispatch(musicDeletedFromPlaylist(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
}

export function playMusicInLibrary(libraryId, music, waitingList, fromPlaylist = false){
  console.log("libraryId, music, waitingList, fromPlaylist", libraryId, music, waitingList, fromPlaylist)
  return dispatch => {
    axios.post(`/api/libraries/${libraryId}/library_player_musics`, { ...music, from: fromPlaylist ? "playlist" : "library" })
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(libraryPlayerEmptied());
        dispatch(musicAddedToPlayer(response.data));
        dispatch(addWaitingListToLibraryPlayer(libraryId, waitingList))
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
}

export function emptyLibraryPlayer(libraryId){
  return dispatch => {
    axios.delete(`/api/libraries/${libraryId}/library_player_musics`)
      .then(response => {
        console.log("emptyLibraryPlayer, response", response)
        setNextHeaders(response.headers)
        dispatch(libraryPlayerEmptied());
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
}

function addWaitingListToLibraryPlayer(libraryId, musics){
  return dispatch => {
    console.log("addWaitingListToLibraryPlayer", libraryId, musics)
    axios.post(`/api/libraries/${libraryId}/add_waiting_list`, { musics })
    .then(response => {
      console.log("addWaitingListToLibraryPlayer response", response)
      setNextHeaders(response.headers)
      dispatch(waitingListAddedToPlayer(response.data));
    }).catch((error)=>{
      errorHandling(error)
    })
  }
}

export function updateLibraryPlayerMusic(libraryId, libraryPlayerMusicId, params){
  console.log("BEFORE updateLibraryPlayerMusic", libraryId, libraryPlayerMusicId, params)
  return dispatch => {
    axios.put(`/api/libraries/${libraryId}/library_player_musics/${libraryPlayerMusicId}`, params).then((response) =>{
      setNextHeaders(response.headers)
      console.log("updateLibraryPlayerMusic ReSPONSE", response)
      dispatch(updatedLibraryPlayerMusic(response.data));
    }).catch((error)=>{
      errorHandling(error)
    })
  };
};

//action creators

export function changeLibraryVolumeBalance(music_number, amount) {
  return {
    type: LIBRARY_VOLUME_BALANCE_CHANGED,
    payload: { music_number, amount }
  };
}

export function selectArtist(id) {
  return {
    type: SELECT_ARTIST,
    payload: id
  };
}

function gotLibrary(data) {
  return {
    type: GOT_LIBRARY,
    payload: data
  };
}

function musicAddedToLibrary(data) {
  return {
    type: MUSIC_ADDED_TO_LIBRARY,
    payload: data
  };
}

function musicAddedToPlaylist(data) {
  return {
    type: MUSIC_ADDED_TO_PLAYLIST,
    payload: data
  };
}

function musicDeletedFromLibrary(data) {
  return {
    type: MUSIC_DELETED_FROM_LIBRARY,
    payload: data
  };
}

function musicDeletedFromPlaylist(data) {
  return {
    type: MUSIC_DELETED_FROM_PLAYLIST,
    payload: data
  };
}

function artistUpdated(data) {
  return {
    type: ARTIST_UPDATED,
    payload: data
  };
}

function musicUpdated(data, formerArtistId) {
  return {
    type: MUSIC_UPDATED,
    payload: data,
    formerArtistId
  };
}

function libraryPlayerEmptied() {
  return {
    type: EMPTY_LIBRARY_PLAYER
  };
}

function musicAddedToPlayer(data) {
  return {
    type: MUSIC_ADDED_TO_LIBRARY_PLAYER,
    payload: data
  };
}

function waitingListAddedToPlayer(data) {
  return {
    type: WAITING_LIST_ADDED_TO_LIBRARY_PLAYER,
    payload: data
  };
}

function updatedLibraryPlayerMusic(data) {
  return {
    type: UPDATED_LIBRARY_PLAYER_MUSIC,
    payload: data
  };
}
