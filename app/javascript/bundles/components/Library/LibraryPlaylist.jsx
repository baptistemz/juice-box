import React, {Component} from 'react';
import {PlaylistCard} from '../../common/index';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { lifecycle } from 'recompose';
import { connect } from 'react-redux';
import {fetchPlaylistMusics} from "../../actions/index";
import PlaylistPreview from '../PlaylistPreview';

let LibraryPlaylist = ({
  selectedPlaylistId,
  selectedPlaylistName,
  fetchPlaylistMusics,
  addMusicTo,
  addMusicToRoom,
  addPlaylistToRoom,
  deleteMusicFrom,
  openSearch,
  inRoom,
  match,
  playlistAdded,
  playMusicInLibrary
}) => {
  return(
    <div className="col s12">
      <div className="my-music-subheader space-between align-items-center">
        <div className="width-100">
          <Link className="my-music-back-btn" to={match.path.slice(0, -4)}>
            <i className="material-icons">arrow_back</i>
            <p className="no-margin">Playlists</p>
          </Link>
        </div>
        <h1 className="text-center">{selectedPlaylistName}</h1>
        <div className="width-100"></div>
      </div>
      <hr/>
      <PlaylistPreview
        inRoom={inRoom}
        addMusicTo={addMusicTo}
        added={playlistAdded}
        playMusicInLibrary={playMusicInLibrary}
        addPlaylistToRoom={addPlaylistToRoom}
        addMusicToRoom={addMusicToRoom}
        deleteMusicFrom={deleteMusicFrom}
        openSearch={() => openSearch()}
        playlistId={selectedPlaylistId} inLibrary/>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlaylistMusics }, dispatch);
}

function mapStateToProps({ playlist }) {
  return {
    selectedPlaylistId: playlist.selectedPlaylistId,
    selectedPlaylistName: playlist.selectedPlaylistName,
  }
}
LibraryPlaylist = lifecycle({
  componentDidMount() {
    this.props.fetchPlaylistMusics(this.props.match.params.id)
  }
})(LibraryPlaylist);

 export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LibraryPlaylist)
);
