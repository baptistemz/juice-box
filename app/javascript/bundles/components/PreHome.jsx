import React from 'react';
import { Link } from 'react-router-dom';
import RoomCreation from './RoomCreation'
import { Button } from '../common/index';


const PreHome = () => {
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
      <h1 id="home_title">Party collaborative music playlists</h1>
      <br/>
      <div className="text-center">
        <Button icon="play_circle_outline" color="primary">Demo</Button>
      </div>
      <img id="home_logo" src="/logo.png" alt=""/>
    </div>
  );
}

export default PreHome;
