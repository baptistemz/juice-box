import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
import AuthReducer from './auth_reducer'

const rootReducer = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  router: routerReducer,
  auth: AuthReducer,
});

export default rootReducer;
