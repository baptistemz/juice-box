import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/index';

class Sidenav extends Component {
  componentDidMount(){
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 300,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 60, // Spacing from edge
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
        <span className="white-text">{email}</span>
        <br/>
        <span className="capitalize white-text">{username}</span>
        <a onClick={this.logout.bind(this)}><div className="btn btn-small">Log out</div></a>
      </div>
    )
  }
  render(){
    const { location } = this.props;
    return(
      <div>
        <div className="sidenav right">
          <a className="dropdown-button" data-activates='dropdown_avatar'>
            <div className="avatar-group">
              <img className="avatar" src="/avatar.png" alt=""/>
            </div>
          </a>
          <div id="dropdown_avatar">
            { this.userData() }
          </div>
          <Link to="/">
            <div className={`nav ${location.pathname === "/" ?"active" : ""}`}><div className="description">Dashboard</div><i className="icon material-icons">home</i></div>
          </Link>
          <Link to="/playlists">
            <div className={`nav ${location.pathname === "/playlists" ? "active" : ""}`}><div className="description">My playlists</div><i className="icon material-icons">list</i></div>
          </Link>
          <Link to="/new_playlist">
            <div className={`nav ${location.pathname === "/new_playlist" ? "active" : ""}`}><div className="description">New playlist</div><i className="icon material-icons">playlist_add</i></div>
          </Link>
          <Link to="/account">
            <div className={`nav ${location.pathname === "/account" ? "active" : ""}`}><div className="description">Account</div><i className="icon material-icons">person</i></div>
          </Link>
          <img className="sidenav-logo" src="/logo.png" alt=""/>
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Sidenav));
