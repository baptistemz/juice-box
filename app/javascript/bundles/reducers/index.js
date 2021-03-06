import { persistCombineReducers } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
import storage from 'redux-persist/es/storage';
import AuthReducer from './auth_reducer';
import RoomReducer from './room_reducer';
import MusicSearchReducer from './music_search_reducer';
import MusicBoardReducer from './music_board_reducer';
import PlaylistReducer from './playlist_reducer';
import LibraryReducer from './library_reducer';

const config = {
  key: 'root',
  blacklist: ['music_board', 'room'],
  storage
}

const rootReducer = persistCombineReducers( config, {
  form: formReducer,
  toastr: toastrReducer,
  router: routerReducer,
  auth: AuthReducer,
  room: RoomReducer,
  music_search: MusicSearchReducer,
  music_board: MusicBoardReducer,
  playlist: PlaylistReducer,
  library: LibraryReducer,
});

export default rootReducer;
