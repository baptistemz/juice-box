import axios from 'axios';
import { setNextHeaders } from '../utils/tokenManagement';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { errorHandling } from '../utils/errorHandling';
import {
  ROOM_CREATED,
  ROOM_UPDATED,
  ROOM_ERROR,
  GOT_ROOM_LIST,
  GOT_ROOM,
  USER_CONNECTED,
  USER_DISCONNECTED,
  CONNECTED_STRANGER_NUMBER_CHANGED
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
  console.log("before fetchrooms", axios.defaults.headers.common)
  return dispatch => {
    axios.get('/api/rooms')
      .then(response => {
        // console.log(" fetchrooms response headers", response.headers)
        console.log("fetchRooms response ", response)
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
    const splittedSlug = slug.split("/");
    axios.get(`/api/${splittedSlug[1]}/${splittedSlug[2]}`)
      .then(response => {
        console.log("fetchRoom response ", response)
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


//action creators


export function connectUserToRoom(user) {
  return {
    type: USER_CONNECTED,
    payload: user
  };
}

export function disconnectUserFromRoom(user) {
  return {
    type: USER_DISCONNECTED,
    payload: user
  };
}

export function connectedStrangerNumberChanged(number) {
  return {
    type: CONNECTED_STRANGER_NUMBER_CHANGED,
    payload: number
  };
}

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
