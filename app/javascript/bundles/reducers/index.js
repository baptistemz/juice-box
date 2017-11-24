import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
import storage from 'redux-persist/es/storage'
import AuthReducer from './auth_reducer'

const config = {
  key: 'root',
  storage
}

const rootReducer = persistCombineReducers( config, {
  form: formReducer,
  toastr: toastrReducer,
  router: routerReducer,
  auth: AuthReducer,
});

export default rootReducer;
