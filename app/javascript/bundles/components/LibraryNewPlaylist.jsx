import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { Input, Button } from '../common/index';
import { createPlaylist } from '../actions/index';

let LibraryNewPlaylist = ({ createPlaylist, handleSubmit }) => {
  return(
    <div className="col s12">
      <div className="my-music-subheader space-between align-items-center">
        <div className="width-100">
          <Link className="my-music-back-btn" to="/library/playlists">
            <i className="material-icons">arrow_back</i>
            <p className="no-margin">Playlists</p>
          </Link>
        </div>
        <h1 className="text-center">New playslist</h1>
        <div className="width-100"></div>
      </div>
      <hr/>
      <br/>
      <br/>
      <br/>
      <form onSubmit={handleSubmit(values => createPlaylist(values.name))}>
        <Input icon="queue_music" name="name" label="Playlist name" type="text" autoFocus />
        <div style={{ marginLeft: "3rem" }}>
          <Button icon="create" type="submit">Create</Button>
        </div>
      </form>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPlaylist }, dispatch);
}

export default reduxForm({
  form: 'new_playlist'
})(connect(null, mapDispatchToProps)(LibraryNewPlaylist));
