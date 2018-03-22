import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, MusicListElement } from '../../common/index';
import { selectArtist, updateMusic } from '../../actions/index';

class LibraryArtist extends Component {
  constructor(){
    super();
    this.state = { editing: {}, titleField: "" };
  }
  componentDidMount(){
    this.props.selectArtist(this.props.match.params.id);
    $('#music_edit_modal').modal({
      endingTop: "0%"
    });
  }
  updateTitleField(value){
    this.setState({ titleField: value });
  }
  editItem(e, music){
    e.preventDefault();
    console.log("editItem", $('#music_edit_modal'))
    this.setState({ editing: music, titleField: music.song || music.whole_name });
    $('#music_edit_modal').modal('open')
  }
  submit(e){
    e.preventDefault();
    this.props.updateMusic(this.state.editing.id, this.state.titleField)
    $('#music_edit_modal').modal('close')
  }
  handleAddClick(e, music){
    e.preventDefault();
    $(`#artist_music_${music.music_key}_modal`).modal({endingTop: "O%"});
    $(`#artist_music_${music.music_key}_modal`).modal('open');
  }
  handleDeleteClick(e, music){
    e.preventDefault();
    this.props.deleteMusicFrom("library", music);
  }
  addToPlaylists = (lists, video) => {
    let ids = _.keys(_.pickBy(lists))
    if(lists.library && !lists.already_in_library){
      console.log("oui  ajoute a la library")
      this.props.addMusicTo("library", video);
      _.pull(ids, "library");
    }
    ids.map(id =>{
      if(!id.startsWith("already") && lists[id] && !lists[`already_in_${id}`]){
        console.log("OUI AJoute à la liste", lists[id])
        this.props.addMusicTo("playlist", video, id)
      }
    })
  }
  render(){
    const { selectedArtist, selectedArtistMusics, libraryId, playlists, playMusicInLibrary, inRoom, match, addMusicToRoom } = this.props;
    if(!selectedArtist){
      return <div>Loading</div>
    }
    return(
      <div className="col s12">
        <div className="my-music-subheader space-between align-items-center">
          <div className="width-100">
            <Link className="my-music-back-btn" to={match.path.slice(0, -4)}>
              <i className="material-icons">arrow_back</i>
              <p className="no-margin">Artists</p>
            </Link>
          </div>
          <h1 className="text-center">{selectedArtist.name}</h1>
          <div className="width-100"></div>
        </div>
        <hr/>
        {selectedArtistMusics.length > 0 ?
          <div className="my-music-records-list">
            <ul className="collection library-collection">
              {selectedArtistMusics.map((music) => {
                return(
                  <MusicListElement
                    libraryId={libraryId}
                    playlists={playlists}
                    key={`artist_music_${music.music_key}`}
                    id={`artist_music_${music.music_key}`}
                    music={music}
                    playMusicInLibrary={playMusicInLibrary}
                    handleAddClick={this.handleAddClick}
                    inRoom={inRoom}
                    addMusicToRoom={addMusicToRoom}
                    handleDeleteClick= {this.handleDeleteClick.bind(this)}
                    addToPlaylists={this.addToPlaylists}
                    editItem={this.editItem.bind(this)} />
                )
              })}
            </ul>
            <div id="music_edit_modal" className="edit-modal modal">
              <div className="modal-close material-icons">clear</div>
              <div className="col s12 margin-top-20">
                <h3 className="text-center">Edit the Title "{this.state.editing.song || this.state.editing.whole_name }"</h3>
                <form onSubmit={this.submit.bind(this)}>
                  <input type="text" value={this.state.titleField} onChange={(e) => this.updateTitleField(e.target.value)}/>
                  <div className="justify-end">
                    <Button action="submit" icon="edit">Update</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        :
          <div>No music</div>
        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectArtist, updateMusic }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(LibraryArtist));
