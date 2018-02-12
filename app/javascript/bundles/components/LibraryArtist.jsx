import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, AddToListWindow } from '../common/index';
import { selectArtist, updateMusic } from '../actions/index';

class LibraryArtist extends Component {
  constructor(){
    super();
    this.state = { editing: {}, titleField: "" };
  }
  componentDidMount(){
    this.props.selectArtist(this.props.match.params.id);
    $('.modal').modal({
       endingTop: "0%"
    });
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
    $(`#${music.music_key}_artist_music_modal`).modal('open');
    console.log("add to playlist", music);
  }
  handleDeleteClick(e, music){
    e.preventDefault();
    console.log("delete", music);
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
    const { selectedArtist, selectedArtistMusics } = this.props;
    if(!selectedArtist){
      return <div>Loading</div>
    }
    return(
      <div className="col s12">
        <div className="my-music-subheader space-between align-items-center">
          <div className="width-100">
            <Link className="my-music-back-btn" to="/library/artists">
              <i className="material-icons">arrow_back</i>
              <p className="no-margin">Artists</p>
            </Link>
          </div>
          <h1 className="text-center">{selectedArtist.name}</h1>
          <div className="width-100"></div>
        </div>
        <hr/>
        {selectedArtistMusics.length > 0 ?
          <div className="my-music-records-list overflow-scroll">
            <ul className="collection library-collection">
              {selectedArtistMusics.map((music) => {
                return(
                  <a key={music.music_key}>
                    <div className="collection-item-overlay">
                      <li onClick={(e) => {console.log("let's play this song", e)}} className="collection-item">
                        <p className="align-items-center">
                          <span onClick={(e) => this.editItem(e, music)}><i className="material-icons margin-right-10 primary-text">edit</i></span>
                          {music.song}
                        </p>
                      </li>
                      <i data-activates={`artist_music_dropdown_${music.music_key}`} className="dropdown-button secondary-text material-icons">more_horiz</i>
                      <ul id={`artist_music_dropdown_${music.music_key}`} className='dropdown-content'>
                        <li><span onClick={(e) => this.handleAddClick(e, music)}><i className="material-icons">playlist_add</i>Add to playlist</span></li>
                        <li><span onClick={(e) => this.handleDeleteClick(e, music)}><i className="material-icons">delete</i>Delete from library</span></li>
                      </ul>
                    </div>
                    <AddToListWindow id={`${music.music_key}_artist_music_modal`}
                      musicKey={music.music_key} addToPlaylists={(lists) => this.addToPlaylists(lists, music)}
                      inLibrary={true} musicName={music.song} />
                  </a>
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
