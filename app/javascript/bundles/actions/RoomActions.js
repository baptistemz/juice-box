import axios from 'axios';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { errorHandling } from '../utils/errorHandling';
import {
  ROOM_CREATED,
  ROOM_UPDATED,
  ROOM_ERROR,
  GOT_ROOM_LIST,
  GOT_ROOM,
  ROOM_STARTED
} from './types';
import slugify from "../utils/slugify";

// API CALLS

export function createRoom(values){
  values['slug'] = slugify(values['name'])
  return dispatch => {
    axios.post('/api/rooms', values)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(roomCreated(response.data));
        dispatch(push(`/rooms/${response.data.slug}`));
        toastr.success(`Your room has been created`);
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
        dispatch(roomCreationError(error.response.data.errors));
      })
  };
};

export function fetchRooms(values){
  // console.log("before fetchrooms", axios.defaults.headers.common)
  return dispatch => {
    axios.get('/api/rooms')
      .then(response => {
        // console.log(" fetchrooms response headers", response.headers)
        setNextHeaders(response.headers)
        // console.log(" fetchrooms after response axios", axios.defaults.headers.common)
        dispatch(gotRooms(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
};

export function fetchRoom(slug){
  return dispatch => {
    axios.get(`/api${slug}`)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(gotRoom(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
};

export function updateRoom(room_id, params){
  return dispatch => {
    axios.put(`/api/rooms/${room_id}`, params).then((response) =>{
      setNextHeaders(response.headers)
      dispatch(roomUpdated(response.data));
    }).catch((error)=>{
      errorHandling(error)
    })
  };
};

// export function reinitializeRoom(room_id){
//   return dispatch => {
//     console.log("IN REINITIALIZE")
//     axios.get(`/api/rooms/${room_id}/fix_music_states`).then((response) =>{
//       console.log("IN REINITIALIZE RESPONSE")
//       setNextHeaders(response.headers)
//       dispatch({ type: REINITIALIZE_ROOM });
//     }).catch((error)=>{
//       errorHandling(error)
//     })
//   }
// }


//action creators


// export function startRoom() {
//   console.log("START ROOM")
//   return {
//     type: ROOM_STARTED
//   };
// }

function roomCreated(data) {
  return {
    type: ROOM_CREATED,
    payload: data
  };
}

function roomUpdated(data) {
  return {
    type: ROOM_UPDATED,
    payload: data
  };
}

function gotRooms(data) {
  return {
    type: GOT_ROOM_LIST,
    payload: data
  };
}

function gotRoom(data) {
  return {
    type: GOT_ROOM,
    payload: data
  };
}


function roomCreationError(errors) {
  return {
    type: ROOM_ERROR,
    payload: errors
  };
}
