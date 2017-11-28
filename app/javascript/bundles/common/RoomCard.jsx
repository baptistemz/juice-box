import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ name, contributorsNumber, playing, ownerName, slug }) => {
  return (
    <Link to={`/rooms/${slug}`} className="room-list-item">
      <div className="dark-background room-card">
        <div className="contributors-icon primary-text"><i className="material-icons">person</i>5</div>
        <div id="equalizer-container">
          <div className="active equalizer" />
        </div>
        <img src="/disc.png" alt=""/>
        <div className="white-text"><h6>{name}</h6> by {ownerName}</div>
      </div>
    </Link>
  );
};

export { RoomCard };
