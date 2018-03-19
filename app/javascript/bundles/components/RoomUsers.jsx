import React, {Component} from 'react';
import { Button } from '../common/index';


const RoomUsers = ({ connectedUsers, connectedStrangerNumber, roomUrl }) => {
  const copyUrl = () => {
    const copyText = document.querySelector("#room_input");
    copyText.select();
    document.execCommand("Copy");
  }
  return(
    <div className="container">
      <h4 id="settings_title">Users</h4>
      <br/>
      <p>Connected users :</p>
      <div className="user-list">
        <ul className="collection">
          {connectedUsers && connectedUsers.map((user, index)=> {
            return <li key={index} className="collection-item">{user.username}</li>
          })}
        </ul>
      </div>
      <p>+{connectedStrangerNumber} strangers </p>
      <br/>
      <h5>Invite more people</h5>
      <p>Your room URL :</p>
      <div className="room-url-input">
        <input readOnly id="room_input" type="text" value={document.location.href} />
        <Button clickTrigger={copyUrl} icon="link">Copy the link</Button>
      </div>
      <br/>
      <h5>Room status</h5>
      <br/>
      <div className="switch">
        <label>
          Public
          <input type="checkbox" />
          <span className="lever"></span>
          Private
        </label>
      </div>
    </div>
  )
}

export default RoomUsers;
