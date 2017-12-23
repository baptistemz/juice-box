import axios from 'axios';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import { errorHandling } from '../utils/errorHandling';
import {
  GOT_PLAYLISTS,
  GOT_PLAYLIST_MUSICS,
} from './types';

// API CALLS

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
      dispatch(gotPlaylistMusics(playlistId, response.data));
    }).catch((error)=>{
      console.log("error", error)
      errorHandling(error, (action) => dispatch(action))
    })
  };
};

//action creators

function gotPlaylists(data){
  return {
    type: GOT_PLAYLISTS,
    payload: data
  }
}

function gotPlaylistMusics(id, data){
  return {
    type: GOT_PLAYLIST_MUSICS,
    payload: data,
    id
  }
}
