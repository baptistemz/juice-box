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
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        // gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'right', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
      }
    );
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
  handleAddClick(e, music){
    e.preventDefault();
    this.props.addMusicTo("library", music)
  }
  handleDeleteClick(e, music){
    e.preventDefault();
    console.log("delete", music);
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
              <ul className="collection library-collection">
                {selectedPlaylistMusics.map((music) => {
                  const wholeName = music.artist && music.artist.name && music.name ? `${music.artist.name} - ${music.name}`: music.whole_name
                  return(
                    <a key={music.music_key}>
                      <div className="collection-item-overlay">
                        <li onClick={(e) => {console.log("let's play this song", e)}} className="collection-item">
                          <p className="truncate">{wholeName}</p>
                        </li>
                        {inLibrary ?
                          <div>
                            <i data-activates={`dropdown_playlist_music_${music.music_key}`} className="dropdown-button secondary-text material-icons">more_horiz</i>
                            <ul id={`dropdown_playlist_music_${music.music_key}`} className='dropdown-content'>
                              <li><span onClick={(e) => this.handleAddClick(e, music)}><i className="material-icons">playlist_add</i>Add to my library</span></li>
                              <li><span onClick={(e) => this.handleDeleteClick(e, music)}><i className="material-icons">delete</i>Delete from playlist</span></li>
                            </ul>
                          </div>
                          :
                          <a className="secondary-content" onClick={() => this.addMusic(music)}><i className="material-icons">playlist_add</i></a>
                        }
                      </div>
                    </a>
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
