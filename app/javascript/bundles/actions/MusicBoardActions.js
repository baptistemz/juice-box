import axios from 'axios';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import { gotRoom } from './index'
import { errorHandling } from '../utils/errorHandling';
import {
  MUSIC_ENDED,
  MUSIC_ADDED,
  WAITING_LIST_ORDER_CHANGED,
  VOLUME_BALANCE_CHANGED,
  MUSIC_STARTED,
  MUSIC_DELETED
} from './types';

export function addMusicToRoom(room_id, params){
  console.log("addMusicToRoom: room_id, params", room_id, params)
  return dispatch => {
    axios.post(`/api/rooms/${room_id}/room_musics`, params)
      .then((response) =>{
        setNextHeaders(response.headers)
      }).catch((error)=>{
        errorHandling(error)
      })
  };
};

export function updateRoomMusic(room_id, room_music_id, params){
  return dispatch => {
    axios.put(`/api/rooms/${room_id}/room_musics/${room_music_id}`, params).then((response) =>{
      setNextHeaders(response.headers)
    }).catch((error)=>{
      errorHandling(error)
    })
  };
};

export function changeWaitingListOrder(room_id, room_music_ids){
  return dispatch => {
    axios.post(`/api/rooms/${room_id}/change_order`, {room_music_ids: room_music_ids})
      .then((response) => {
        setNextHeaders(response.headers)
        // dispatch(gotRoom(response.data));
      }).catch((error)=>{
        errorHandling(error)
      })
  };
};

export function deleteMusicFromRoom(room_id, music_id){
  return dispatch => {
    axios.delete(`/api/rooms/${room_id}/room_musics/${music_id}`).then((response) =>{
      setNextHeaders(response.headers)
    }).catch((error)=>{
      errorHandling(error)
    })
  };
};

export function addPlaylistToRoom(room_id, playlist_id){
  console.log("addPlaylistToRoom(room_id, playlist_id)", room_id, playlist_id)
  return dispatch => {
    axios.post(`/api/rooms/${room_id}/add_playlist`, { playlist_id }).then((response) =>{
      setNextHeaders(response.headers)
    }).catch((error)=>{
      errorHandling(error)
    })
  };
};

//ACTION CREATORS

export function musicEnded(music) {
  return {
    type: MUSIC_ENDED,
    payload: music
  };
}

export function musicStarted(music) {
  return {
    type: MUSIC_STARTED,
    payload: music
  };
}

export function musicAdded(music) {
  return {
    type: MUSIC_ADDED,
    payload: music
  };
}

export function musicDeleted(music) {
  return {
    type: MUSIC_DELETED,
    payload: music
  };
}

export function changeVolumeBalance(music_number, amount) {
  return {
    type: VOLUME_BALANCE_CHANGED,
    payload: { music_number, amount }
  };
}

export function waitingListOrderChanged(list) {
  return {
    type: WAITING_LIST_ORDER_CHANGED,
    payload: list
  };
}
