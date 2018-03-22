import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import { fetchLibrary } from "./index";
import { errorHandling } from '../utils/errorHandling';
import {
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  PROFILE_UPDATED
} from './types';


// API CALLS

export function validateToken(){
  console.log("CALL VALIDATE TOKEN")
  return dispatch => {
    if(localStorage["persist:root"] && JSON.parse(JSON.parse(localStorage["persist:root"]).auth).isAuthenticated){
      // console.log("before validate token", getHeadersObject(localStorage))
      axios.defaults.headers.common = getHeadersObject(localStorage);
      const request = axios.get('/api/auth/validate_token?unbatch=true')
      return request
        .then(response => {
          if(response.data.success){
            // console.log("after validate token, reponse headers", response.headers)
            setNextHeaders(response.headers);
            // console.log("after validate token, axios headers", axios.defaults.headers)
            dispatch(receiveUser(response.data.data));
          }else{
            dispatch(receiveLogout());
          }
        }).catch(error => {
          dispatch(receiveLogout())
        });
    }
  };
};

export function loginUser(data, next_path) {
  return dispatch => {
    return axios.post('/api/auth/sign_in', data)
      .then((response) => {
        console.log(response)
        //STORE TOKEN IN LOCAL STORAGE AND IN AXIOS HEADERS FOR NEXT REQUEST
        console.log("loginUser headers", response.headers)
        console.log("loginUser data", response.data)
        setNextHeaders(response.headers)
        //SEND AN ACTION TO AUTH REDUCER TO REGISTER USER IN STORE
        dispatch(receiveUser(response.data.data))
        // Maybe the cause of a bug
        // dispatch(fetchLibrary(response.data.data.library.id))
        //REDIRECT USER
        dispatch(push(next_path ? next_path : '/library/playlists'));
        //Send a flash message
        toastr.success('Logged in', 'authentification success');
      }).catch((error) => {
        console.log(error)
        dispatch(authError(error.response.data.errors));
        errorHandling(error);
      })
  };
}

export function signupUser(data, next_path) {
  return dispatch => {
    return axios.post('/api/auth', data)
      .then(response => {
        //STORE TOKEN IN LOCAL STORAGE AND IN AXIOS HEADERS FOR NEXT REQUEST
        setNextHeaders(response.headers)
        //SEND AN ACTION TO AUTH REDUCER TO REGISTER USER IN STORE
        dispatch(receiveUser(response.data.data))
        dispatch(fetchLibrary(response.data.data.library.id))
        //Send a flash message
        toastr.success('Logged in', 'authentification success');
        //REDIRECT USER
        dispatch(push(next_path ? next_path : '/library/playlists'));

      }).catch((error) => {
        dispatch(authError(error.response.data.errors));
        errorHandling(error);
      });
  };
}

export function updateProfile(data, success_message, next_path) {
  console.log("CALL update profile headers", axios.defaults.headers.common)
  return dispatch => {
    return axios.put('/api/auth/', data)
    .then(response => {
      console.log("update profile RESPONSE headers", response.headers)
      setNextHeaders(response.headers)
      if(success_message){
        toastr.success(success_message);
      }
      dispatch(profileUpdated(response.data.data))
      if(next_path){dispatch(push(next_path))};
    }).catch((error) => {
      console.log(error.response)
      dispatch(authError(error.response.data.errors));
      errorHandling(error);
    })
  };
}

export function logoutUser() {
  return dispatch => {
    axios.delete('/api/auth/sign_out')
      .then(response => {
        localStorage.clear();
        toastr.success('Log out', 'see you soon');
        dispatch(receiveLogout());
      }).catch((error)=>{
        console.log("logoutUser error", error);
        localStorage.clear();
        dispatch(receiveLogout());
      })
  };
}

export function errorLogout() {
  return dispatch => {
    localStorage.clear();
    // toastr.success('Log out', 'see you soon');
    dispatch(receiveLogout());
  };
}


export function updatePassword(data, params = null) {
  return dispatch => {
    if(params){
      params.forEach((value, key) => {
        axios.defaults.headers.common[key] = value;
        axios.defaults.headers.common['reset'] = true;
        if(key === 'token'){ axios.defaults.headers.common['access-token'] = value };
        if(key === 'client_id'){ axios.defaults.headers.common['client'] = value };
      });
    }
    axios.put('api/auth/password', data)
      .then(response => {
        setNextHeaders(response.headers)
        $('#password_modal').modal('close')
        dispatch(reset('password_change'))
        toastr.success(response.data.message);
        if(params){dispatch(push('/login'))}
      }).catch((error)=>{
        // setNextHeaders(error.response.headers)
        dispatch(authError(error.response.data.errors));
        errorHandling(error);
      })
  };
}
export function sendPasswordResetEmail(data) {
  return dispatch => {
    axios.post('api/auth/password', data)
      .then(response => {
        dispatch(authError({}));
        toastr.success(response.data.message);
        dispatch(push("/login"))
      }).catch((error)=>{
        dispatch(authError(error.response.data.errors));
        errorHandling(error);
      })
  };
}


// REDUX ACTION CREATORS

export function authError(errors){
  if(!errors){
    return {
      type: AUTH_ERROR,
      payload: {main: "An error occured. Retry later or contact us."}
    }
  }else if (errors.length === 0){
    return {
      type: AUTH_ERROR,
      payload: {}
    }
  }else if (errors.length === 1){
    return {
      type: AUTH_ERROR,
      payload: { main: errors[0] }
    }
  }else{
    const errorGroup = {};
    Object.keys(errors).forEach(function(key,index) {
      errorGroup[key] = errors[key];
    });
    return {
      type: AUTH_ERROR,
      payload: errorGroup
    }
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isAuthenticated: false
  };
}

export function receiveUser(user) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true,
    user
  };
}

export function profileUpdated(user) {
  return {
    type: PROFILE_UPDATED,
    user
  };
}
