import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ name, ownerName }) => {
  return (
    <div className="dark-background room-card">
      <div className="contributors-icon primary-text"></div>
      <div id="equalizer-container">
        <div className="active equalizer" />
      </div>
      <div className="primary-text">
        <i className="material-icons">music_list</i>
      </div>
      <div className="white-text"><h6>{name}</h6> by {ownerName}</div>
    </div>
  );
};

export { PlaylistCard };
