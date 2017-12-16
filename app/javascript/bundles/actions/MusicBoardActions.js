import axios from 'axios';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import { toastr } from 'react-redux-toastr';
import { gotRoom } from './index'
import { errorHandling } from '../utils/errorHandling';
import {
  MUSIC_ENDED,
  MUSIC_ADDED,
  WAITING_LIST_ORDER_CHANGED,
  VOLUME_BALANCE_CHANGED,
  MUSIC_STARTED
} from './types';

export function addMusicToRoom(room_id, music){
  const params = {
    provider: "youtube",
    music_key: music.id.videoId,
    whole_name: music.snippet.title,
  }
  if(music.snippet.title.split('-').length === 2){
    params['artist'] = music.snippet.title.split('-')[0].trim();
    params['song'] = music.snippet.title.split('-')[1].trim();
  }
  return dispatch => {
    axios.post(`/api/rooms/${room_id}/room_musics`, params)
      .then((response) =>{
        setNextHeaders(response.headers)
      }).catch((error)=>{
        errorHandling(error)
      })
  };
};

export function updateMusic(room_id, room_music_id, params){
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

// export function deleteMusic(room_id, room_music_id, params){
//   return dispatch => {
//     axios.put(`/api/rooms/${room_id}/room_musics/${room_music_id}`, params).then((response) =>{
//       setNextHeaders(response.headers)
//     }).catch((error)=>{
//       errorHandling(error)
//     })
//   };
// };

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
