import axios from 'axios';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import { errorHandling } from '../utils/errorHandling';
import {
  GOT_LIBRARY
} from './types';

// API CALLS

export function fetchLibrary(slug){
  return dispatch => {
    axios.get(`/api/library`)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(gotLibrary(response.data));
      }).catch((error)=>{
        errorHandling(error, (action) => dispatch(action))
      })
  };
};

//action creators



function gotLibrary(data) {
  return {
    type: GOT_LIBRARY,
    payload: data
  };
}
