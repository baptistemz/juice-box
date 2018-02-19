import React, {Component} from 'react';
import {PlaylistCard} from '../common/index';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchPlaylistMusics} from "../actions/index";
import PlaylistPreview from './PlaylistPreview';

class LibraryPlaylist extends Component {
  componentDidMount(){
    this.props.fetchPlaylistMusics(this.props.match.params.id)
  }
  render(){
    const { selectedPlaylistId, selectedPlaylistName } = this.props;
    return(
      <div className="col s12">
        <div className="my-music-subheader space-between align-items-center">
          <div className="width-100">
            <Link className="my-music-back-btn" to="/library/playlists">
              <i className="material-icons">arrow_back</i>
              <p className="no-margin">Playlists</p>
            </Link>
          </div>
          <h1 className="text-center">{selectedPlaylistName}</h1>
          <div className="width-100"></div>
        </div>
        <hr/>
        <PlaylistPreview
          addMusicTo={this.props.addMusicTo}
          deleteMusicFrom={this.props.deleteMusicFrom}
          openSearch={() => this.props.openSearch()}
          playlistId={selectedPlaylistId} inLibrary/>
      </div>
    )
  }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LibraryPlaylist));
