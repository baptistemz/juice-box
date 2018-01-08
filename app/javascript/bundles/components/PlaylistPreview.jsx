import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Loader } from "../common/index";
import { addMusicToRoom, addPlaylistToRoom } from "../actions/index";


class PlaylistPreview extends Component {
  constructor(){
    super();
    this.state = { addingListToRoom: false }
  }
  componentDidMount(){
    const { isAuthenticated, fetchPlaylistMusics } = this.props;
  }
  componentDidUpdate(previousProps){
    if(this.props.added !== previousProps.added){
      this.setState({ addingListToRoom: !this.props.added });
    }
  }
  addMusic(music){
    const params={
      artist: music.artist,
      song: music.song,
      whole_name: music.whole_name,
      provider: music.provider,
      music_key: music.music_key
    }
    this.props.addMusicToRoom(this.props.roomId, params)
  }
  addList(){
    this.setState({ addingListToRoom: true })
    this.props.addPlaylistToRoom(this.props.roomId, this.props.playlistId)
  }
  render(){
    const { playlistId, selectedPlaylistId, selectedPlaylistName, selectedPlaylistMusics } = this.props;
    if(selectedPlaylistId === playlistId){
      return(
        <div className="col s12 text-center">
          <h3>{selectedPlaylistName}</h3>
          <div className="playlist-modal-list overflow-scroll">
            <ul className="collection">
              {selectedPlaylistMusics.map((music) => {
                return(
                  <li key={music.music_key} className="collection-item">
                    <div className="truncate primary-content">{music.whole_name}</div>
                    <a className="secondary-content" onClick={() => this.addMusic(music)}><i className="material-icons">playlist_add</i></a>
                  </li>
                )
              })}
            </ul>
          </div>
          <Button clickTrigger={this.addList.bind(this)} icon="shuffle" disabled={this.state.addingListToRoom || this.props.added}>
            {this.state.addingListToRoom ?
              <Loader style={{ marginTop: "-36px" }} />
            :
              "Add to room (random order)"
            }
          </Button>
        </div>
      )
    }
    return(
      <div>PLaylist preview</div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMusicToRoom, addPlaylistToRoom }, dispatch);
}

function mapStateToProps({ playlist: { selectedPlaylistId, selectedPlaylistMusics, selectedPlaylistName } }) {
  return {
    selectedPlaylistId, selectedPlaylistMusics, selectedPlaylistName
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview);
