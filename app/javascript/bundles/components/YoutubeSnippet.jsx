import React from 'react';

const YoutubeSnippet = ({ video, onVideoSelect, addVideoToList }) => {
  const imgUrl = video.snippet.thumbnails.medium.url;
  return (
      <li className="col s12 m6">
        <div className='card'>
          <div className="card-image">
            <div style={{ backgroundImage: `url(${imgUrl})` }} />
            <p className="card-title truncate-block">{video.snippet.title}</p>
            <p className='video-duration'>{video.duration}</p>
          </div>
          <div className="card-action">
            <a rel="no-refresh" onClick={onVideoSelect}>
              <i className="material-icons">play_arrow</i>play next
            </a>
            <a rel="no-refresh" onClick={addVideoToList}>
              <i className="material-icons">playlist_add</i>add to list
            </a>
          </div>
        </div>
      </li>
  );
};

export default YoutubeSnippet
