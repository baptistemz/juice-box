import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist'
import history from './history';
import reducers from '../reducers';

const routingMiddleware = routerMiddleware(history)

const createStoreWithMiddleware = applyMiddleware(thunk, routingMiddleware)(createStore);

export default function configureStore(initialState) {
  const dev_tools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {}
  let store = createStoreWithMiddleware(
    reducers,
    dev_tools
  );
  let persistor = persistStore(store)
  return { persistor, store }
}
