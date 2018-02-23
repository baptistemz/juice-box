import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Checkbox, Button } from './index';

class AddToListWindow extends Component {
  constructor(props){
    super(props);
    let state = {}
    props.playlists.map(playlist =>{
      state[playlist.id] = _.includes(playlist.music_keys, props.musicKey);
      state[`already_in_${playlist.id}`] = _.includes(playlist.music_keys, props.musicKey);
    });
    state["library"] = props.inLibrary
    state["already_in_library"] = props.inLibrary
    this.state = state
  }
  componentDidMount(){
    $('.modal').modal({
       endingTop: "0%"
    });
  }
  openListChoice(){
    $(`#${this.props.id}`).modal('open');
  }
  onCheck = (id, value) => {
    this.setState({ [id]: !this.state[id] });
  }
  addToPlaylists(){
    this.props.addToPlaylists(this.state);
    $(`#${this.props.id}`).modal('close');
  }
  render(){
    const { libraryId, playlists, musicName, withText } = this.props;
    return(
      <div>
        <a onClick={(e) => this.openListChoice()}>
          {this.props.children}
        </a>
        <div id={this.props.id} className="room-modal modal">
          <div className="modal-close material-icons">clear</div>
          <div className="col s12 margin-top-20">
            <h1 className="secondary-text" style={{ paddingLeft: "0" }}>Add "{musicName}"</h1>
            <br/>
            <div className="row margin-top-20">
              <Checkbox clickEvent={(e) => this.onCheck("library", e)} label="To My Library" id={`library_${libraryId}_${this.props.id}`} checked={this.state["library"]}/>
            </div>
            <br/>
            {playlists.length > 0 ?
              <div className="row">
                <h5 className="secondary-text text-left">To a playlist:</h5>
                <br/>
                {playlists.map((playlist) => {
                  return <Checkbox key={playlist.id} clickEvent={(v) => this.onCheck(playlist.id, v)} label={"To " + playlist.name} id={`${playlist.id}_${this.props.id}`} checked={this.state[playlist.id]}/>
                })}
              </div>
              :
              <div/>
            }
            <br/>
            <div className="margin-top-20">
              <Button clickTrigger={this.addToPlaylists.bind(this)} icon="add">Add "{musicName}"</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({auth, library}) {
  return {
    libraryId: auth.libraryId,
    playlists: library.playlists
  }
}

AddToListWindow = reduxForm({
  form: 'add_to_playlist' // a unique name for this form
})(connect(mapStateToProps, null)(AddToListWindow));

export { AddToListWindow };
