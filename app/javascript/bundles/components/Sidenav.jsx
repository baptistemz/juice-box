import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/index';
import { Button } from '../common/index'

class Sidenav extends Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: [
        { url: "/library", name: "My Library", icon: "library_music"},
        { url: "/rooms", name: "Rooms", icon: "playlist_play"},
        { url: "/account", name: "Account", icon: "account_box"}
      ],
      notAuthenticated: [
        { url: "/home", name: "Home", icon: "home"},
        { url: { pathname: '/login', state: { from: props.location.pathname === '/rooms' ? '/' : props.location.pathname } }, name: "Log in", icon: "lock_outline"},
        { url: { pathname: '/signup', state: { from: props.location.pathname === '/rooms' ? '/' : props.location.pathname } }, name: "Sign up", icon: "create"}
      ]
    }
  }
  componentDidMount(){
    $('.dropdown-button.side-drop').dropdown({
      inDuration: 300,
      outDuration: 300,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      gutter: 60, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
    $('.dropdown-button.bottom-drop').dropdown({
      inDuration: 300,
      outDuration: 300,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      gutter: -25, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
  }
  logout(event){
    event.preventDefault();
    this.props.logoutUser();
  }
  userData(){
    const { email, username } = this.props;
    return (
      <div className="avatar-dropdown">
        <span className="capitalize white-text">{username}</span>
        <span className="white-text">({email})</span>
        <br/>

        <a onClick={this.logout.bind(this)}>
          <Button icon="exit_to_app">Log out</Button>
        </a>
      </div>
    )
  }

  tabs(){
    const { location, isAuthenticated } = this.props;
    if(isAuthenticated){
      return this.state.authenticated.map(tab => {
        return(
          <Link key={tab.url} to={tab.url}>
            <div className={`nav ${location.pathname.startsWith(tab.url) ?"active" : ""}`}><div className="description">{tab.name}</div><i className="icon material-icons">{tab.icon}</i></div>
          </Link>
        )
      })
    }
    return this.state.notAuthenticated.map(tab => {
      return(
        <Link key={tab.icon} to={tab.url}>
          <div className={`nav ${location.pathname.startsWith(tab.url) ?"active" : ""}`}><div className="description">{tab.name}</div><i className="icon material-icons">{tab.icon}</i></div>
        </Link>
      )
    })
  }
  render(){
    const { profile_picture, isAuthenticated } = this.props;
    return(
      <div>
        <div className="hide-on-small-only sidenav">
          {isAuthenticated ?
            <div>
              <a className="dropdown-button side-drop" data-activates='dropdown_side_avatar'>
                <div className="avatar-group">
                  <img className="avatar" src={profile_picture || "/avatar.png"} alt=""/>
                </div>
              </a>
              <div id="dropdown_side_avatar">
                { this.userData() }
              </div>
            </div>
          :
            <div/>
          }
          {this.tabs()}
          <img className="sidenav-logo" src="/logo.png" alt=""/>
        </div>
        <div className="bottomnav">
          {isAuthenticated ?
            <div>
              <a className="dropdown-button bottom-drop" data-activates='dropdown_mobile_avatar'>
                <div className="mobile-avatar-group">
                  <img className="avatar" src={profile_picture || "/avatar.png"} alt=""/>
                </div>
              </a>
              <div id="dropdown_mobile_avatar">
                { this.userData() }
              </div>
            </div>
            :
            <Link to={"/about"}>
              <div className={`nav ${location.pathname.startsWith("/about") ?"active" : ""}`}><div className="description">About</div><i className="icon material-icons">info_outline</i></div>
            </Link>
          }
          {this.tabs()}
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

function mapStateToProps({ auth: { profile_picture, isAuthenticated, username, email } }) {
  return {
    profile_picture: profile_picture.thumb.url,
    isAuthenticated,
    username,
    email
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidenav));
