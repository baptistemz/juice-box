import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { addMusic } from '../actions/index';
import YoutubeSnippet from '../components/YoutubeSnippet';

class MusicSearchResults extends Component {
  playMusic(music) {
    console.log("play", music)
    // this.props.addMusic(this.props.room_id, music, status);
  }
  addMusicToList(music) {
    // this.props.addMusic(this.props.room_id, music, status);
    console.log("add", music)
  }
  render() {
    const musics = this.props.musics;
    return (
      <div>
        <div className="row">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            { musics.map((music) => {
              return (
                <YoutubeSnippet
                  onVideoSelect={this.playMusic.bind(this, music)}
                  addVideoToList={this.addMusicToList.bind(this, music)}
                  key={music.etag}
                  video={music}
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
  return bindActionCreators({ addMusic }, dispatch);
}
export default connect(null, mapDispatchToProps)(MusicSearchResults);
