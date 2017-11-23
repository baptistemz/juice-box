import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import history from './history';
import thunk from 'redux-thunk';
import reducers from '../reducers';


const routingMiddleware = routerMiddleware(history)

const createStoreWithMiddleware = applyMiddleware(thunk, routingMiddleware)(createStore);

export default function configureStore(initialState) {
  const dev_tools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {}
  return createStoreWithMiddleware(
    reducers,
    dev_tools
  );
}
