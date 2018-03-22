import React, {Component} from 'react';
import {PlaylistCard} from '../../common/index';
import { Link } from 'react-router-dom';

const LibraryPlaylists = ({ playlists, inRoom, match }) => {
  if(!playlists){
    return <div />
  }
  return(
      <div className="row">
        <div className="col s12"><h5>Library Playlists</h5></div>
        {playlists.map((playlist) => (
            <Link key={playlist.name} to={inRoom ? `${match.url}/${playlist.id}` : `/library/playlists/${playlist.id}`}>
              <div className={`playlist-thumb col s6 m4 l${inRoom ? "6" : "3"}`}>
                <div className="playlist-thumb-background">
                  <PlaylistCard name={playlist.name} ownerName={playlist.owner_name} />
                </div>
              </div>
            </Link>
          )
        )}
        {inRoom ?
          <div/>
          :
          <Link to="/library/new_playlist">
            <div className={`playlist-thumb col s6 m4 l${inRoom ? "6" : "3"}`}>
              <div className="playlist-thumb-background">
                <i className="material-icons">add</i>
              </div>
            </div>
          </Link>
        }
      </div>
  )
}

export default LibraryPlaylists;
