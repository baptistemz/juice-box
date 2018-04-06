import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withState, withHandlers, compose, pure } from 'recompose';
import { Button, AddToListWindow, MusicListElement } from "../../common/index";
import { updateMusic } from '../../actions/index';

const adding = withState('adding', "setAdding", null)

const editing = withState('editing', 'setEditing', {})

const titleField = withState('titleField', 'setTitleField', "")

const artistField = withState('artistField', 'setArtistField', "")

const handlers = withHandlers({
  editItem: ({ setEditing, setTitleField, setArtistField }) => (e, music) => {
    e.preventDefault();
    setEditing(music)
    setTitleField(music.song || music.whole_name)
    setArtistField(music.artist && music.artist.name || music.whole_name)
    $('#music_and_artist_edit_modal').modal({ endingTop: "O%" })
    $('#music_and_artist_edit_modal').modal('open')
  },
  submit: ({ updateMusic, editing, titleField, artistField }) => (e) => {
    e.preventDefault();
    updateMusic(editing.id, titleField, artistField, editing.artist.id);
    $('#music_and_artist_edit_modal').modal('close')
  },
  handleAddClick: ({ setAdding }) => (e, music) => {
    console.log("handleAddClick")
    setAdding(music)
  },
  handleDeleteClick: ({ deleteMusicFrom }) => (e, music) => {
    e.preventDefault();
    deleteMusicFrom("library", music)
  },
  addToPlaylists: ({ addMusicTo, adding }) => (lists, video) => {
    let ids = _.keys(_.pickBy(lists))
    if(lists[`${adding.music_key}_library`] && !lists[`${adding.music_key}_already_in_library`]){
      console.log("ADDMUSIC TO LIBRARAY")
      addMusicTo("library", video);
    }
    ids.map(id =>{
      const splittedId = id.split("_")
      if( splittedId[1] !== "already" && splittedId[1] !== "library" && !lists[`${splittedId[0]}_already_in_${splittedId[1]}`]){
        console.log("ADDMUSIC TO PLAYLIST")
        addMusicTo("playlist", video, splittedId[1])
      }
    })
  }
})

let LibraryMusics = ({
  libraryId,
  playlists,
  musics,
  playMusicInLibrary,
  inRoom,
  addMusicToRoom,
  handleAddClick,
  handleDeleteClick,
  addToPlaylists,
  editItem,
  submit,
  adding,
  editing,
  artistField,
  titleField,
  setArtistField,
  setTitleField,
  setAdding
}) => {
  if(musics.length === 0){
    return <div>There are no musics in your library search and add some ;)</div>
  }
  if(!inRoom && adding){
    console.log("adding", adding)
    $("#add_to_list_modal").modal({endingTop: "O%", complete: () => setAdding(null)});
    $("#add_to_list_modal").modal('open');
  }
  return(
    <div className="col s12">
      <div className="my-music-records-list">
        <ul style={{ overflow: "visible" }} className="collection library-collection">
          <h5>Library Musics</h5>
          {musics.map((music, index) => {
            const wholeName = music.song && music.artist && music.artist.name ? music.artist.name + ' - ' + music.song : music.whole_name
            return(
              <MusicListElement
                key={`library_music_${music.music_key}`}
                id={`library_music_${music.music_key}`}
                music={music}
                name={wholeName}
                playMusicInLibrary={() => playMusicInLibrary(music, musics.slice(index + 1))}
                handleAddClick={(e, music) => {
                  e.preventDefault();
                  handleAddClick(e, music);
                }}
                handleDeleteClick= {handleDeleteClick}
                editItem={editItem}
                addMusicToRoom={addMusicToRoom}
                inRoom={inRoom} />
            )
          })}
        </ul>
        <div id="music_and_artist_edit_modal" className="edit-modal modal">
          <div className="modal-close material-icons">clear</div>
          <div className="col s12 margin-top-20">
            <h3 className="text-center">Edit "{editing.song && editing.artist && editing.artist.name ? editing.song + ' - ' + editing.artist.name : editing.whole_name}"</h3>
            <form onSubmit={submit}>
              <label className="capitalize" htmlFor="artist_name_input">Artist name</label>
              <input id="artist_name_input" type="text" value={artistField} onChange={(e) => setArtistField(e.target.value)}/>
              <br/>
              <label className="capitalize" htmlFor="music_name_input">Music name</label>
              <input id="music_name_input" type="text" value={titleField} onChange={(e) => setTitleField(e.target.value)}/>
              <br/>
              <div className="justify-end">
                <Button action="submit" icon="edit">Update</Button>
              </div>
            </form>
          </div>
        </div>
        <AddToListWindow id="add_to_list_modal"
          musicKey={adding && adding.music_key} addToPlaylists={(lists) => addToPlaylists(lists, adding)}
          libraryId={libraryId} playlists={playlists}
          inLibrary={true} musicName={adding && adding.song} />
      </div>
    </div>
  )
}

LibraryMusics = compose(
  adding,
  editing,
  titleField,
  artistField,
  handlers,
  pure
)(LibraryMusics);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMusic }, dispatch);
}

export default connect(null, mapDispatchToProps)(LibraryMusics);
