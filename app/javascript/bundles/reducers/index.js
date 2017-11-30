import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
import storage from 'redux-persist/es/storage';
import AuthReducer from './auth_reducer';
import RoomReducer from './room_reducer';
import MusicSearchReducer from './music_search_reducer';

const config = {
  key: 'root',
  storage
}

const rootReducer = persistCombineReducers( config, {
  form: formReducer,
  toastr: toastrReducer,
  router: routerReducer,
  auth: AuthReducer,
  room: RoomReducer,
  music_search: MusicSearchReducer,
});

export default rootReducer;
