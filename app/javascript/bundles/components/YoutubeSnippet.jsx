import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { AddToListWindow } from '../common/index'

const YoutubeSnippet = ({
  video,
  inLibrary,
  addVideo,
  playMusicInLibrary,
  openModal
}) => {
  const imgUrl = video.snippet.thumbnails.medium.url;
  const style = { backgroundImage: `url(${imgUrl})`, packgroundPostion: "center", backgroundSize: "cover" };
  return (
    <div>
      <li className={`col s12 m6 ${inLibrary ? "l4" : "l6"}`}>
        <div className='card'>
          <div className="card-image">
            <div style={style} />
            <p className="card-title truncate-block">{video.snippet.title}</p>
            <p className='video-duration'>{video.duration}</p>
          </div>
          {!inLibrary ?
            <div className="card-action">
              <a rel="no-refresh" onClick={() => addVideo("room", video)}>
                <i className="material-icons">playlist_add</i>add to room
                </a>
              </div>
              :
              <div className="card-action">
                <a rel="no-refresh" onClick={() => playMusicInLibrary(video)}>
                  <i className="material-icons">play_arrow</i>play
                </a>
                <a onClick={() => openModal()}>
                  <i className="material-icons secondary-text">playlist_add</i>Add
                </a>
              </div>
            }
          </div>
        </li>
    </div>
  );
};

export default YoutubeSnippet
