import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { AddToListWindow } from '../common/index'

const YoutubeSnippet = ({ video,
  addVideoToList,
  inLibrary,
  addVideo,
  playVideoInLibrary,
  ownerPlaylists,
  libraryMusics,
  playlists,
  libraryId
}) => {
  const imgUrl = video.snippet.thumbnails.medium.url;
  const style = { backgroundImage: `url(${imgUrl})`, packgroundPostion: "center", backgroundSize: "cover" };
  const addToPlaylists = (lists, video) => {
    let ids = _.keys(_.pickBy(lists))
    if(lists.library && !lists.already_in_library){
      console.log("oui  ajoute a la library")
      addVideo("library", video);
      _.pull(ids, "library");
    }
    ids.map(id =>{
      if(!id.startsWith("already") && lists[id] && !lists[`already_in_${id}`]){
        console.log("OUI AJoute à la liste", lists[id])
        addVideo("playlist", video, id)
      }
    })
  }
  $('.modal').modal({ endingTop: "0%" });
  return (
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
                <i className="material-icons">playlist_add</i>add to list
              </a>
            </div>
          :
            <div className="card-action">
              <a rel="no-refresh" onClick={playVideoInLibrary}>
                <i className="material-icons">play_arrow</i>play
              </a>
              <AddToListWindow id={`${video.id.videoId}_modal`}
                libraryId={libraryId}
                playlists={playlists}
                musicKey={video.id.videoId} addToPlaylists={(lists) => addToPlaylists(lists, video)}
                inLibrary={_.find(libraryMusics, { music_key: video.id.videoId }) ? true : false}
                musicName={video.snippet.title}><i className="material-icons secondary-text">playlist_add</i>Add</AddToListWindow>
            </div>
          }
        </div>
      </li>
  );
};

export default YoutubeSnippet
