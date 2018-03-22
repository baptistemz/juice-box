import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, AddToListWindow, MusicListElement } from "../../common/index";
import { updateMusic } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LibraryMusics extends Component {
  constructor(){
    super();
    this.state = { editing: {}, titleField: "", artistField: "" };
  }
  updateTitleField(value){
    this.setState({ titleField: value });
  }
  updateArtistField(value){
    this.setState({ artistField: value });
  }
  editItem(e, music){
    e.preventDefault();
    this.setState({ editing: music, titleField: music.song || music.whole_name, artistField: music.artist && music.artist.name || music.whole_name  });
    $('#music_and_artist_edit_modal').modal({endingTop: "O%"})
    $('#music_and_artist_edit_modal').modal('open')
  }
  submit(e){
    e.preventDefault();
    this.props.updateMusic(this.state.editing.id, this.state.titleField, this.state.artistField, this.state.editing.artist.id);
    $('#music_and_artist_edit_modal').modal('close')
  }
  handleAddClick(e, music){
    e.preventDefault();
    $(`#library_music_${music.music_key}_modal`).modal({endingTop: "O%"});
    $(`#library_music_${music.music_key}_modal`).modal('open');
  }
  handleDeleteClick(e, music){
    e.preventDefault();
    this.props.deleteMusicFrom("library", music)
  }
  addToPlaylists = (lists, video) => {
    let ids = _.keys(_.pickBy(lists))
    if(lists.library && !lists.already_in_library){
      this.props.addMusicTo("library", video);
      _.pull(ids, "library");
    }
    ids.map(id =>{
      if(!id.startsWith("already") && lists[id] && !lists[`already_in_${id}`]){
        this.props.addMusicTo("playlist", video, id)
      }
    })
  }
  render(){
    if(this.props.musics.length === 0){
      return <div>There are no musics in your library search and add some ;)</div>
    }
    const { libraryId, playlists, musics, playMusicInLibrary, inRoom, addMusicToRoom } = this.props;
    return(
      <div className="col s12">
        <div className="my-music-records-list">
          <ul style={{ overflow: "visible" }} className="collection library-collection">
            <h5>Library Musics</h5>
            {musics.map((music) => {
              const wholeName = music.song && music.artist && music.artist.name ? music.artist.name + ' - ' + music.song : music.whole_name
              return(
                <MusicListElement
                  key={`library_music_${music.music_key}`}
                  id={`library_music_${music.music_key}`}
                  libraryId={libraryId}
                  playlists={playlists}
                  music={music}
                  name={wholeName}
                  playMusicInLibrary={playMusicInLibrary}
                  handleAddClick={this.handleAddClick}
                  handleDeleteClick= {this.handleDeleteClick.bind(this)}
                  addToPlaylists={this.addToPlaylists}
                  editItem={this.editItem.bind(this)}
                  addMusicToRoom={addMusicToRoom}
                  inRoom={inRoom} />
              )
            })}
          </ul>
          <div id="music_and_artist_edit_modal" className="edit-modal modal">
            <div className="modal-close material-icons">clear</div>
            <div className="col s12 margin-top-20">
              <h3 className="text-center">Edit "{this.state.editing.song && this.state.editing.artist && this.state.editing.artist.name ? this.state.editing.song + ' - ' + this.state.editing.artist.name : this.state.editing.whole_name}"</h3>
              <form onSubmit={this.submit.bind(this)}>
                <label className="capitalize" htmlFor="artist_name_input">Artist name</label>
                <input id="artist_name_input" type="text" value={this.state.artistField} onChange={(e) => this.updateArtistField(e.target.value)}/>
                <br/>
                <label className="capitalize" htmlFor="music_name_input">Music name</label>
                <input id="music_name_input" type="text" value={this.state.titleField} onChange={(e) => this.updateTitleField(e.target.value)}/>
                <br/>
                <div className="justify-end">
                  <Button action="submit" icon="edit">Update</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMusic }, dispatch);
}

export default connect(null, mapDispatchToProps)(LibraryMusics);
