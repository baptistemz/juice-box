import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../common/index";
import { updateArtist } from '../actions/index';
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
    $('#artist_edit_modal').modal('open')
  }
  componentDidMount(){
    $('.modal').modal();
  }
  updateNameField(value){
    this.setState({ nameField: value });
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
      <div className="col s12 margin-top-20">
        <div className="my-music-records-list overflow-scroll">
          <ul className="collection library-collection">
            {
              this.props.artists.map((artist) => {
                return (
                  <Link key={artist.id} to={`/library/artists/${artist.id}`}>
                    <div className="collection-item-overlay">
                      <li className="collection-item">
                        <p className="align-items-center">
                          {artist.name}
                        </p>
                        <span onClick={(e) => this.editItem(e, artist)}><i className="left-icon material-icons margin-right-10 primary-text">edit</i></span>
                        <i className="secondary-text material-icons right-icon">keyboard_arrow_right</i>
                      </li>
                    </div>
                  </Link>
                )
              })
            }
          </ul>
        </div>
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
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateArtist }, dispatch);
}

export default connect(null, mapDispatchToProps)(LibraryArtists);
