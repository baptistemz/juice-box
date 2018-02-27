import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { addMusicToRoom, addMusicToLibrary, addMusicToPlaylist } from '../actions/index';
import YoutubeSnippet from '../components/YoutubeSnippet';
import { AddToListWindow } from '../common/index'

class MusicSearchResults extends Component {
  addMusicTo(destination, music, id) {
    const params = this.getMusicParams(music);
    switch (destination) {
      case "room":
        this.props.addMusicToRoom(this.props.roomId, params);
        break;
      case "library":
        this.props.addMusicToLibrary(this.props.libraryId, params);
        break;
      case "playlist":
        this.props.addMusicToPlaylist(id, params);
        break;
      default:
    }
  }
  getMusicParams(music){
    const title = music.snippet.title
    const params = {
      provider: "youtube",
      music_key: music.id.videoId,
      whole_name: title,
    }
    if(title.split('-').length === 2){
      params['artist'] = title.split('-')[0].trim();
      params['song'] = title.split('-')[1].trim();
    }else if (title.split('-').length === 1){
      params['artist'] = title
      params['song'] = title
    }else{
      params['artist'] = title.split('-')[0].trim();
      params['song'] = title
    }
    return params
  }
  playMusicInLibrary(music){
    const params = this.getMusicParams(music);
    this.props.playMusicInLibrary(params);
  }
  render() {
    const { musics, playlists, inModal, libraryId, inLibrary, libraryMusics, playMusicInLibrary } = this.props;
    return (
      <div className="overflow-scroll search-scroll margin-top-10">
        <div className="row">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            { musics.map((music) => {
              return (
                <YoutubeSnippet
                  addVideo={this.addMusicTo.bind(this)}
                  playMusicInLibrary={this.playMusicInLibrary.bind(this)}
                  inModal={inModal}
                  key={music.etag}
                  video={music}
                  libraryId={libraryId}
                  playlists={playlists}
                  inLibrary={inLibrary}
                  libraryMusics={libraryMusics}
                  />
              );
            })}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMusicToRoom, addMusicToLibrary, addMusicToPlaylist }, dispatch);
}
export default connect(null, mapDispatchToProps)(MusicSearchResults);
