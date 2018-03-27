import React, {Component} from 'react';
import _ from 'lodash';
import { compose as reduxCompose } from 'redux';
import { connect } from 'react-redux';
// import { reduxForm } from 'redux-form';
import { Input } from 'react-materialize';
import { Button } from './index';
import { withState, withHandlers, compose, pure } from 'recompose';


const state = withState('state', 'setState', ({ musicKey, playlists, inLibrary }) => {
  console.log("inLibrary", inLibrary)
  let state = {}
  playlists.map(playlist =>{
    state[`${musicKey}_${playlist.id}`] = _.includes(playlist.music_keys, musicKey);
    state[`${musicKey}_already_in_${playlist.id}`] = _.includes(playlist.music_keys, musicKey);
  });
  state[`${musicKey}_library`] = inLibrary
  state[`${musicKey}_already_in_library`] = inLibrary
  return state;
});

const handlers = withHandlers({
  addToPlaylists: ({ addToPlaylists, id, state }) => () => {
    addToPlaylists(state);
    $(`#${id}`).modal('close');
  }
})

let AddToListContent = ({ libraryId, playlists, musicName, id, state, setState, addToPlaylists, musicKey }) => {
  return(
    <div className="col s12 margin-top-20">
      <h1 className="secondary-text" style={{ paddingLeft: "0" }}>Add "{musicName}"</h1>
      <br/>
      <div className="row margin-top-20">
        <Input
          onClick={(e) => setState({...state, [`${musicKey}_library`]: !state.library })}
          id={`library_${libraryId}_${id}`}
          name={`library_${libraryId}_${id}`}
          type='checkbox'
          label="To My Library"
          checked={state[`${musicKey}_library`] ? 'checked' : ''} />
      </div>
      <br/>
      {playlists.length > 0 ?
        <div className="row">
          <h5 className="secondary-text text-left">To a playlist:</h5>
          <br/>
          {playlists.map((playlist) => {
            console.log(playlist.name, state, `${musicKey}_${playlist.id}`, state[`${musicKey}_${playlist.id}`])
            return(
              <div key={`${playlist.id}_${id}`} className="col s6 m4 l3 margin-top-20">
                <Input
                  onClick={(e) => setState({...state, [`${musicKey}_${playlist.id}`]: !state[playlist.id] })}
                  id={`${playlist.id}_${id}`}
                  name={`${playlist.id}_${id}`} type='checkbox'
                  label={"To " + playlist.name}
                  checked={state[`${musicKey}_${playlist.id}`] ? 'checked' : ''} />
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
  )
}

AddToListContent = compose(
  state,
  handlers,
  pure
)(AddToListContent)


let AddToListWindow = ({ libraryId, playlists, musicName, id, musicKey, inLibrary, addToPlaylists }) => {
  return(
    <div>
      <div key={id} id={id} className="room-modal modal">
        <div className="modal-close material-icons">clear</div>
          {musicKey ?
            <AddToListContent
              libraryId={libraryId}
              playlists={playlists}
              inLibrary={inLibrary}
              musicName={musicName}
              id={id}
              addToPlaylists={addToPlaylists}
              musicKey={musicKey} />
          :
           <div/>
        }
      </div>

    </div>
  )
}


export { AddToListWindow };
