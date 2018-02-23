import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  PROFILE_UPDATED
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  isAuthenticated: false,
  errors: {},
  id: null,
  email: '',
  username: '',
  profile_picture: {thumb: {url: null}, micro: {url: null}},
  libraryId: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return INITIAL_STATE
    case LOGIN_SUCCESS:{
      const { email, username, profile_picture, id, library } = action.user;
      return { ...state, email, username, profile_picture, id, isAuthenticated: true, errors: {}, libraryId: library.id }
    }
    case PROFILE_UPDATED:{
      const { email, username, profile_picture, id } = action.user;
      return { ...state, isAuthenticated: true, errors: {}, email, username, profile_picture, id }
    }
    case AUTH_ERROR:
      return { ...state, errors: action.payload }
    default:
      return state;
  }
}
