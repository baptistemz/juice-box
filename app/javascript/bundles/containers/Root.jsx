import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { PersistGate } from 'redux-persist/es/integration/react';
import { getHeadersObject } from '../utils/tokenManagement';
import configureStore from '../store/configureStore';
import { Loader } from '../common/index';
import Routes from './Routes';

const Root = () => {
  const { persistor, store } = configureStore()
  const onBeforeLift = () => {
    // console.log("before lift 1", getHeadersObject(localStorage))
    axios.defaults.headers.common = getHeadersObject(localStorage);
    // console.log("before lift 2", axios.defaults.headers.common)
  }
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loader />}
        onBeforeLift={onBeforeLift}
        persistor={persistor}>
        <div>
          <Routes rehydrated={ false } />
          <ReduxToastr
            timeOut={5000}
            preventDuplicates
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            position="bottom-left"
          />
        </div>
      </PersistGate>
    </Provider>
  );
}


export default Root;
