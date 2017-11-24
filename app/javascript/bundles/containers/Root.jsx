import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from '../store/configureStore';
import { Loader } from '../common/index';
import Routes from './Routes';


class RootWithoutRailsContext extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }
  render() {
    const { store, persistor } = this.props;
    const onBeforeLift = () => {
      console.log("BEFORE LIFT")
    }
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loader />}
          onBeforeLift={onBeforeLift}
          persistor={persistor}>
          <div>
            <Routes rehydrated={ this.state.rehydrated } />
            <ReduxToastr
              timeOut={4000}
              preventDuplicates
              position="bottom-right"
            />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

const Root = (props, railsContext) => {
  const { persistor, store } = configureStore()
  return(
    <RootWithoutRailsContext {...{...props, railsContext, store, persistor}}/>
  )
}

export default Root;
