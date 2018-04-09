import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ArtistListElement } from "../../common/index";
import { updateArtist } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LibraryArtists extends Component {
  constructor(){
    super();
    this.state = { editing: {}, nameField: "" };
  }
  editItem(e, artist){
    e.preventDefault();
    this.setState({ editing: artist, nameField: artist.name });
    $('#artist_edit_modal').modal()
    $('#artist_edit_modal').modal('open')
  }
  updateNameField(value){
    this.setState({ nameField: value });
  }
  shouldComponentUpdate(nextProps){
    JSON.stringify(nextProps.artists) !== JSON.stringify(this.props.artists)
  }
  submit(e){
    e.preventDefault();
    this.props.updateArtist(this.state.editing.id, this.state.nameField)
    $('#artist_edit_modal').modal('close')
  }
  render(){
    if(this.props.artists.length === 0){
      return <div>There are no musics in your library search and add some ;)</div>
    }
    return(
      <div className="col s12">
        <div className="my-music-records-list">
          <ul className="collection library-collection">
            <h5>Library Artists</h5>
            {
              this.props.artists && this.props.artists.map(artist => {
                return <ArtistListElement
                        key={artist.id}
                        artist={artist}
                        match={this.props.match}
                        inRoom={this.props.inRoom}
                        editItem={this.editItem.bind(this)}/>
              })
            }
          </ul>
        </div>
        {this.props.inRoom ?
          <div/>
        :
          <div id="artist_edit_modal" className="edit-modal modal">
            <div className="modal-close material-icons">clear</div>
            <div className="col s12 margin-top-20">
              <h3 className="text-center">Edit the name of "{this.state.editing.name}"</h3>
              <form onSubmit={this.submit.bind(this)}>
                <input type="text" value={this.state.nameField} onChange={(e) => this.updateNameField(e.target.value)}/>
                <div className="justify-end">
                  <Button action="submit" icon="edit">Update</Button>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateArtist }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(LibraryArtists));
