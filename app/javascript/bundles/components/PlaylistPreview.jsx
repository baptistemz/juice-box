import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Loader, AddToListWindow } from "../common/index";
// import { addMusicToRoom, addPlaylistToRoom } from "../actions/index";
import { NavItem, Dropdown } from 'react-materialize'

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
    this.props.deleteMusicFrom("playlist", music, this.props.selectedPlaylistId)
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
                  const wholeName = music.artist && music.artist.name && music.song ? `${music.artist.name} - ${music.song}`: music.whole_name
                  return(
                    <a key={music.music_key}>
                      <div className="collection-item-overlay">
                        <li onClick={(e) => {console.log("let's play this song", e)}} className="collection-item" style={{ paddingLeft: "10px" }}>
                          <p className="truncate">{wholeName}</p>
                        </li>
                        {inLibrary ?
                            <Dropdown
                              trigger={<i className="dropdown-button secondary-text material-icons right-icon">more_horiz</i>}
                              options={{ alignment: 'right', constrainWidth: false }}
                              >
                              <NavItem onClick={(e) => this.handleAddClick(e, music)}><i className="material-icons">playlist_add</i>Add to library</NavItem>
                              <NavItem onClick={(e) => this.handleDeleteClick(e, music)}><i className="material-icons">delete</i>Delete from playlist</NavItem>
                            </Dropdown>
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

function mapStateToProps({ playlist: { selectedPlaylistId, selectedPlaylistMusics, selectedPlaylistName } }) {
  return {
    selectedPlaylistId, selectedPlaylistMusics, selectedPlaylistName
  }
}

export default connect(mapStateToProps, null)(PlaylistPreview);
