import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import PrivateRoute from './PrivateRoute';
import PreHome from '../components/PreHome';
import PasswordForgotten from '../components/PasswordForgotten';
import NewPassword from '../components/Auth/NewPassword';
import Signup from '../components/Auth/Signup';
import Login from '../components/Auth/Login';
import Sidenav from '../components/Sidenav';
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
    // let lastLocation = '';
    // history.listen(location => {
    //   if (lastLocation !== location.pathname) {
    //     lastLocation = location.pathname;
    //     this.props.store.dispatch(location.pathname);
    //   }
    // });
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
    console.log("Routes", this.props)
    return(
      <ConnectedRouter history={history}>
        <div>
          { this.state.sideNav ?
            <Sidenav />
            :
            <div/>
          }
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={PreHome} />
          <Route path="/library" component={Library}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/new_password" component={NewPassword} />
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
