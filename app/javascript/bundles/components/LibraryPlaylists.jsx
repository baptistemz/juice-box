import React, {Component} from 'react';
import {PlaylistCard} from '../common/index';
import { Link } from 'react-router-dom';

const LibraryPlaylists = ({ playlists }) => {
  return(
      <div className="row margin-top-20">
        {playlists.map((playlist) => {
          return(
            <Link key={playlist.name} to={`/library/playlists/${playlist.id}`}>
              <div className="playlist-thumb col s6 m4 l3">
                <div className="playlist-thumb-background">
                  <PlaylistCard name={playlist.name} ownerName={playlist.owner_name} />
                </div>
              </div>
            </Link>
          )
        })}
        <Link to="/library/new_playlist">
          <div className="playlist-thumb col s6 m4 l3">
            <div className="playlist-thumb-background">
              <i className="material-icons">add</i>
            </div>
          </div>
        </Link>
      </div>
  )
}

export default LibraryPlaylists;
