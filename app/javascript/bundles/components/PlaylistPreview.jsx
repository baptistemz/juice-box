import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Loader, AddToListWindow } from "../common/index";
// import { addMusicToRoom, addPlaylistToRoom } from "../actions/index";


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
  noMusic(){
    return(
      <div>
        <big>There are no musics in this playlist for the moment. <br/> Please search and add some ;)</big>
        {!this.props.inLibrary ?
          <div/>
        :
          <Button clickTrigger={() => this.props.openSearch()} icon="search">Search</Button>
        }
      </div>
    )
  }
  render(){
    const { playlistId, selectedPlaylistId, selectedPlaylistName, selectedPlaylistMusics, inLibrary, ownerPlaylists } = this.props;
    if(selectedPlaylistId === playlistId){
      return(
        <div className="col s12 text-center">
          {!inLibrary ?
            <h3>{selectedPlaylistName}</h3>
          :
            <div/>
          }
          <div className="playlist-modal-list overflow-scroll">
            {selectedPlaylistMusics.length > 0 ?
              <ul className="collection">
                {selectedPlaylistMusics.map((music) => {
                  const musicName = music.artist && music.artist.name && music.name ? `${music.artist.name} - ${music.name}`: music.whole_name
                  return(
                    <li key={music.music_key} className="collection-item">
                      <div className="truncate primary-content">{musicName}</div>
                      {inLibrary ?
                        <span className="secondary-content"><AddToListWindow id={`${music.music_key}_modal`} musicKey={music.music_key} addToPlaylists={(lists) => console.log("add", lists, music)} musicName={musicName}><i className="material-icons secondary-text">playlist_add</i></AddToListWindow></span>
                      :
                        <a className="secondary-content" onClick={() => this.addMusic(music)}><i className="material-icons">playlist_add</i></a>
                      }
                    </li>
                  )
                })}
              </ul>
            :
              this.noMusic()
            }
          </div>
          {selectedPlaylistMusics.length > 0 ?
            <Button clickTrigger={this.addList.bind(this)} icon="shuffle" disabled={this.state.addingListToRoom || this.props.added}>
              {this.state.addingListToRoom ?
                <Loader style={{ marginTop: "-36px" }} />
              :
                "Add to room (random order)"
              }
            </Button>
          :
            <div/>
          }
        </div>
      )
    }
    return(
      <div>PLaylist preview</div>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ addMusicToRoom, addPlaylistToRoom }, dispatch);
// }

function mapStateToProps({ playlist: { selectedPlaylistId, selectedPlaylistMusics, selectedPlaylistName } }) {
  return {
    selectedPlaylistId, selectedPlaylistMusics, selectedPlaylistName
  }
}

export default connect(mapStateToProps, null)(PlaylistPreview);
