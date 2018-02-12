import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import ReduxToastr from 'react-redux-toastr';
import PrivateRoute from './PrivateRoute';
import PreHome from '../components/PreHome';
import PasswordForgotten from '../components/PasswordForgotten';
import NewPassword from '../components/NewPassword';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Sidenav from '../components/Sidenav';
import LibraryPlaylists from '../components/LibraryPlaylists';
import Library from './Library';
import RoomList from './RoomList';
import Account from './Account';
import Room from './Room';
import NotFound from '../components/NotFound';
import history from '../store/history';

class Routes extends Component{
  constructor(props){
    super(props)
    const inLibrary = props.isAuthenticated && history.location.pathname === ('/')
    const inSidenavPage = history.location.pathname.startsWith("/rooms") ||
                          history.location.pathname.startsWith("/library") ||
                          history.location.pathname === "/account" ||
                          location.pathname === "/404"
    const sideNav =  inLibrary || inSidenavPage
    this.state = { sideNav };
  }
  render(){
    history.listen((location, action) => {
      const inLibrary = this.props.isAuthenticated && location.pathname === ('/');
      const inSidenavPage = history.location.pathname.startsWith("/rooms") ||
                            history.location.pathname.startsWith("/library") ||
                            history.location.pathname === "/account" ||
                            location.pathname === "/404"
      const sideNav =  inLibrary || inSidenavPage
      this.setState({ sideNav })
    })
    const { isAuthenticated, isMecano, rehydrated, profile_picture, email, username } = this.props;
    const Home = isAuthenticated ? Library : PreHome;
    return(
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={PreHome} />
          <Route path="/library" component={Library}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/new_password" component={NewPassword} />
          { this.state.sideNav ?
            <Sidenav />
          :
            <div/>
          }
          <Route path="/password_forgotten" component={PasswordForgotten}/>
          <PrivateRoute path="/account" isAuthenticated={isAuthenticated} registerMethod="login" component={Account} />
          <PrivateRoute exact path="/rooms" isAuthenticated={isAuthenticated} registerMethod="login" component={RoomList} />
          <Route path="/rooms/:roomId" component={Room}/>
          <Route path="/404" component={NotFound} />
        </div>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps({ auth, error }) {
  return {
    isAuthenticated: auth.isAuthenticated,
    username: auth.username,
    email: auth.email,
    profile_picture: auth.profile_picture,
  }
}

export default connect(mapStateToProps)(Routes);
