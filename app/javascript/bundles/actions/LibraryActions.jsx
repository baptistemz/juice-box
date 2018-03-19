import axios from 'axios';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
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
  MUSIC_ADDED_TO_LIBRARY_PLAYER
} from './types';

// API CALLS

export function fetchLibrary(id){
  return dispatch => {
    axios.get(`/api/libraries/${id}`)
      .then(response => {
        console.log("library response", response)
        setNextHeaders(response.headers)
        dispatch(gotLibrary(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
};

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
};

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
};

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
};

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
};

export function addMusicToPlaylist(playlistId, music){
  console.log("addMusicToPlaylist", playlistId, music)
  return dispatch => {
    axios.post(`/api/playlists/${playlistId}/playlist_musics`, music)
      .then(response => {
        setNextHeaders(response.headers)
        toastr.success(`${response.data.whole_name} added to ${response.data.playlist.name}`);
        dispatch(musicAddedToPlaylist(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
};

export function deleteMusicFromLibrary(libraryId, musicId){
  console.log("deleteMusicFromLibrary", libraryId, musicId)
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
};

export function deleteMusicFromPlaylist(playlistId, musicId){
  console.log("deleteMusicFromPlaylist", playlistId, musicId)
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
};

export function playMusicInLibrary(libraryId, music){
  return dispatch => {
    axios.post(`/api/libraries/${libraryId}/library_player_musics`, music)
      .then(response => {
        console.log("playMusicInLibraryr response headers", response.headers)
        setNextHeaders(response.headers)
        dispatch(emptyLibraryPlayer(response.data));
        dispatch(musicAddedToPlayer(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
};

//action creators

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

function emptyLibraryPlayer() {
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
