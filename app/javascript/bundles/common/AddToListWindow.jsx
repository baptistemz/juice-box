import React, {Component} from 'react';
import _ from 'lodash';
import { compose as reduxCompose } from 'redux';
import { connect } from 'react-redux';
// import { reduxForm } from 'redux-form';
import { Input } from 'react-materialize';
import { Button } from './index';
import { withState, withHandlers, compose, pure } from 'recompose';


const state = withState('state', 'setState', ({ musicKey, playlists, inLibrary }) => {
  let state = {}
  playlists.map(playlist =>{
    state[playlist.id] = _.includes(playlist.music_keys, musicKey);
    state[`already_in_${playlist.id}`] = _.includes(playlist.music_keys, musicKey);
  });
  state["library"] = inLibrary
  state["already_in_library"] = inLibrary
  return state;
});

const handlers = withHandlers({
  addToPlaylists: ({ addToPlaylists, id, state }) => () => {
    addToPlaylists(state);
    $(`#${id}`).modal('close');
  }
})

let AddToListWindow = ({ libraryId, playlists, musicName, withText, children, id, state, setState, addToPlaylists, openAddModal }) => {
  return(
    <div>
      <div id={id} className="room-modal modal">
        <div className="modal-close material-icons">clear</div>
        <div className="col s12 margin-top-20">
          <h1 className="secondary-text" style={{ paddingLeft: "0" }}>Add "{musicName}"</h1>
          <br/>
          <div className="row margin-top-20">
            <Input onClick={(e) => setState({...state, library: !state.library })} id={`library_${libraryId}_${id}`} name={`library_${libraryId}_${id}`} type='checkbox' label="To My Library" checked={state.library ? 'checked' : ''} />
          </div>
          <br/>
          {playlists.length > 0 ?
            <div className="row">
              <h5 className="secondary-text text-left">To a playlist:</h5>
              <br/>
              {playlists.map((playlist) => {
                return(
                  <div key={`${playlist.id}_${id}`} className="col s6 m4 l3 margin-top-20">
                    <Input
                      onClick={(e) => setState({...state, [playlist.id]: !state[playlist.id] })}
                      id={`${playlist.id}_${id}`}
                      name={`${playlist.id}_${id}`} type='checkbox'
                      label={"To " + playlist.name}
                      checked={state[playlist.id] ? 'checked' : ''} />
                  </div>
                )
              })}
            </div>
            :
            <div/>
          }
          <br/>
          <div className="margin-top-20">
            <Button clickTrigger={addToPlaylists} icon="add">Add "{musicName}"</Button>
          </div>
        </div>
      </div>

    </div>
  )
}

AddToListWindow = compose(
  state,
  handlers,
  pure
)(AddToListWindow)

export { AddToListWindow };
