import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import configureStore from '../store/configureStore';
import Routes from './Routes';


class Root extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <div>
          <Routes />
          <ReduxToastr
            timeOut={4000}
            preventDuplicates
            position="bottom-right"
          />
        </div>
      </Provider>
    );
  }
}

export default Root;
