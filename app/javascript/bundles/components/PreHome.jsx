import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, RoomCreation } from '../common/index';


class PreHome extends Component {
  componentDidMount(){
    var viewportHeight = $('.banner').outerHeight();
    $('.home-background').css({ height: viewportHeight });
  }
  render() {
    return (
      <div className="home-background">
        <div className="container">
          <RoomCreation topRightCorner={true} background="clear-background" />
          <div className="login-btn-group">
            <Link to={"/login"}>
              <Button>Log in</Button>
            </Link>
            <p>OR</p>
            <Link to={"/signup"}>
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
        <h1 id="home_title">The collaborative playlist experience</h1>
        <br/>
        <div className="text-center">
          <Button icon="play_circle_outline" color="primary">Demo</Button>
        </div>
        <img id="home_logo" src="/logo.png" alt=""/>
      </div>
    );
  }
}

export default PreHome;
