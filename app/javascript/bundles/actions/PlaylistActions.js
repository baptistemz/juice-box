import axios from 'axios';
import { push } from 'react-router-redux';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import { errorHandling } from '../utils/errorHandling';
import {
  GOT_PLAYLISTS,
  GOT_PLAYLIST_MUSICS,
  PLAYLIST_CREATED
} from './types';

// API CALLS

export function createPlaylist(name){
  return dispatch => {
    axios.post('/api/playlists', {name: name})
      .then(response => {
        setNextHeaders(response.headers)
        console.log("response.data", response.data)
        dispatch(playlistCreated(response.data));
        dispatch(push(`/library/playlists/${response.data.playlist.id}`));
      }).catch((error)=>{
        console.log("error", error)
        errorHandling(error, (action) => dispatch(action))
      })
  };
};

export function fetchPlaylists(){
  return dispatch => {
    axios.get('/api/playlists')
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(gotPlaylists(response.data));
      }).catch((error)=>{
        console.log("error", error)
        errorHandling(error, (action) => dispatch(action))
      })
  };
};

export function fetchPlaylistMusics(playlistId){
  return dispatch => {
    axios.get(`/api/playlists/${playlistId}/playlist_musics`)
    .then(response => {
      setNextHeaders(response.headers)
      dispatch(gotPlaylistMusics(response.data));
    }).catch((error)=>{
      console.log("error", error)
      errorHandling(error, (action) => dispatch(action))
    })
  };
};

//action creators

function playlistCreated(data){
  return {
    type: PLAYLIST_CREATED,
    payload: data
  }
}

function gotPlaylists(data){
  return {
    type: GOT_PLAYLISTS,
    payload: data
  }
}

function gotPlaylistMusics(data){
  return {
    type: GOT_PLAYLIST_MUSICS,
    payload: data,
  }
}
