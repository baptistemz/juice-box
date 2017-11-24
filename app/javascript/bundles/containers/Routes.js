import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import ReduxToastr from 'react-redux-toastr';
import PrivateRoute from './PrivateRoute';
import PreHome from '../components/PreHome';
import PasswordForgotten from '../components/PasswordForgotten';
import NewPassword from '../components/NewPassword';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Sidenav from '../components/Sidenav';
import Dashboard from '../components/Dashboard';
import Playlists from '../components/Playlists';
import NewPlaylist from '../components/NewPlaylist';
import Account from '../components/Account';
import history from '../store/history';



class Routes extends Component{
  render(){
    const { isAuthenticated, isMecano, rehydrated, profile_picture, email, username } = this.props;
    console.log(this.props)
    const Home = isAuthenticated ? Dashboard : PreHome;
    return(
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/new_password" component={NewPassword} />
          <div>
            {isAuthenticated ?
              <Sidenav username={username} profile_picture={profile_picture} email={email}/>
              :
              <div/>}
            <Route path="/password_forgotten" component={PasswordForgotten}/>
            <PrivateRoute path="/account" isAuthenticated={isAuthenticated} registerMethod="login" component={Account} />
            <PrivateRoute path="/playlists" isAuthenticated={isAuthenticated} registerMethod="login" component={Playlists} />
            <PrivateRoute path="/new_playlist" isAuthenticated={isAuthenticated} registerMethod="login" component={NewPlaylist} />
          </div>
        </div>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated,
    username: auth.username,
    email: auth.email,
    profile_picture: auth.profile_picture
  }
}

export default connect(mapStateToProps)(Routes);
