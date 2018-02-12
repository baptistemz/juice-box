import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ name, ownerName, picture }) => {
  return (
    <div className="playlist-card">
      <div style={{
          backgroundImage: `url(${picture ? picture : "/playlist_default_picture.jpeg" })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "greyscale(1)"
        }} className="card">
        <div className="contributors-icon primary-text"></div>
        <div className="margin-top-10">
          <img src="/playlist_icon.png" alt=""/>
        </div>
      </div>
      <div className="white-text"><h6>{name}</h6> by {ownerName}</div>
    </div>
  );
};

export { PlaylistCard };
