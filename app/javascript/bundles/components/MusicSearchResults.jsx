import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { addMusicToRoom } from '../actions/index';
import YoutubeSnippet from '../components/YoutubeSnippet';

class MusicSearchResults extends Component {
  addMusicToList(music) {
    this.props.addMusicToRoom(this.props.roomId, music);
  }
  render() {
    const musics = this.props.musics;
    return (
      <div className="overflow-scroll search-scroll">
        <div className="row">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            { musics.map((music) => {
              return (
                <YoutubeSnippet
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
  return bindActionCreators({ addMusicToRoom }, dispatch);
}
export default connect(null, mapDispatchToProps)(MusicSearchResults);
