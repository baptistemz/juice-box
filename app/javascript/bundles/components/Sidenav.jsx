import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/index';
import { Button } from '../common/index'

const SIDENAV_TABS = {
  authenticated: [
    { url: "/", name: "My music", icon: "music_note"},
    { url: "/rooms", name: "Music rooms", icon: "list"},
    { url: "/account", name: "Account", icon: "account_box"}
  ],
  notAuthenticated: [
    { url: "/", name: "Home", icon: "home"},
    { url: "/login", name: "Log in", icon: "lock_outline"},
    { url: "/signup", name: "Sign up", icon: "create"}
  ]
}

class Sidenav extends Component {
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
        gutter: -92, // Spacing from edge
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
      return SIDENAV_TABS.authenticated.map(tab => {
        return(
          <Link key={tab.url} to={tab.url}>
            <div className={`nav ${location.pathname === tab.url ?"active" : ""}`}><div className="description">{tab.name}</div><i className="icon material-icons">{tab.icon}</i></div>
          </Link>
        )
      })
    }
    return SIDENAV_TABS.notAuthenticated.map(tab => {
      return(
        <Link key={tab.url} to={tab.url}>
          <div className={`nav ${location.pathname === tab.url ?"active" : ""}`}><div className="description">{tab.name}</div><i className="icon material-icons">{tab.icon}</i></div>
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
          {this.tabs()}
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
            <div/>
          }
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
