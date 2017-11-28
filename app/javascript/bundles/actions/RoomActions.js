import axios from 'axios';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import {
  ROOM_CREATED,
  ROOM_ERROR,
  GOT_ROOM_LIST,
  GOT_ROOM
} from './types';
import slugify from "../utils/slugify";

// API CALLS

export function createRoom(values){
  values['slug'] = slugify(values['name'])
  return dispatch => {
    axios.post('api/rooms', values)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(roomCreated(response.data));
        dispatch(push(`/rooms/${response.data.slug}`));
        toastr.success(`Your room has been created`);
      }).catch((error)=>{
        console.log(error.response)
        dispatch(roomCreationError(error.response.data.errors));
      })
  };
};

export function fetchRooms(values){
  return dispatch => {
    axios.get('api/rooms')
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(gotRooms(response.data));
      }).catch((error)=>{
        console.log(error)
      })
  };
};

export function fetchRoom(slug) {
  const getUrl = `/api${slug}`;
  const request = axios.get(getUrl);
  return (dispatch) => {
    request.then((response) => {
      console.log(response)
      dispatch({ type: GOT_ROOM, payload: response.data });
    });
  };
}

function roomCreated(data) {
  return {
    type: ROOM_CREATED,
    payload: data
  };
}

function gotRooms(data) {
  return {
    type: GOT_ROOM_LIST,
    payload: data
  };
}

function roomCreationError(errors) {
  return {
    type: ROOM_ERROR,
    payload: errors
  };
}
