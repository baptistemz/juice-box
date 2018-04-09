import React  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withState, withHandlers, compose, pure } from 'recompose';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { addMusicToRoom, addMusicToLibrary, addMusicToPlaylist } from '../actions/index';
import YoutubeSnippet from '../components/YoutubeSnippet';
import { AddToListWindow } from '../common/index'


const adding = withState('adding', "setAdding", null)

// const modalMusic = withState('modalMusic', "setModalMusic", ({musics}) => {return musics[0]})

const dataFormat = withHandlers({
  getMusicParams: () => (music) => {
    const title = music.snippet.title
    const params = {
      provider: "youtube",
      music_key: music.id.videoId,
      whole_name: title,
    }
    if(title.split('-').length === 2){
      params['artist'] = title.split('-')[0].trim();
      params['song'] = title.split('-')[1].trim();
    }else if (title.split('-').length === 1){
      params['artist'] = title
      params['song'] = title
    }else{
      params['artist'] = title.split('-')[0].trim();
      params['song'] = title
    }
    return params
  }
})

const handlers = withHandlers({
  addMusicTo: ({ getMusicParams, addMusicToRoom, addMusicToLibrary, addMusicToPlaylist, roomId, libraryId }) => (destination, music, id) => {
    const params = getMusicParams(music);
    switch (destination) {
      case "room":
        addMusicToRoom(roomId, params);
        break;
      case "library":
        console.log(" in swicth add to library", libraryId, params)
        addMusicToLibrary(libraryId, params);
        break;
      case "playlist":
        console.log(" in swicth add to playlist", libraryId, params)
        addMusicToPlaylist(id, params);
        break;
      default:
        return
    }
  },
  playMusicInLibrary: ({ getMusicParams, playMusicInLibrary }) => (music) => {
    const params = getMusicParams(music);
    playMusicInLibrary(params, []);
  },
  openModal: ({ setAdding }) => (music) => {
    // console.log("OPEN MODAL")
    // setModalMusic(music)
    // $(`#search_add_to_playlist_${inModal ? 'modal' : 'window'}_modal`).modal({ endingTop: "0%" })
    // $(`#search_add_to_playlist_${inModal ? 'modal' : 'window'}_modal`).modal('open')
    console.log("music", music)
    setAdding(music)
  }
})

const modalHandlers = withHandlers({
  addToPlaylists: ({ addMusicTo, adding, setAdding }) => (lists) => {
    let ids = _.keys(_.pickBy(lists[adding.id.videoId]))
    console.log("adding, lists, ids", adding, lists, ids)
    if(lists[adding.id.videoId] && lists[adding.id.videoId].library && !lists[adding.id.videoId].already_in_library){
      console.log("ADDMUSIC TO LIBRARAY", adding)
      addMusicTo("library", adding);
      _.pull(ids, "library");
    }
    ids.map(id =>{
      if(!id.startsWith("already") && lists[adding.id.videoId][id] && !lists[adding.id.videoId][`already_in_${id}`]){
        console.log("ADDMUSIC TO PLAYLIST", adding, id)
        addMusicTo("playlist", adding, id)
      }
    })
    setAdding(null)
  }
})

let MusicSearchResults = ({
  musics,
  playlists,
  inModal,
  libraryId,
  inLibrary,
  libraryMusics,
  addMusicTo,
  playMusicInLibrary,
  adding,
  setAdding,
  addToPlaylists,
  openModal
}) => {
  if(adding){
    console.log("adding", adding)
    $(`#search_add_to_playlist_${inModal ? 'modal' : 'window'}_modal`).modal({endingTop: "O%", complete: () => setAdding(null)});
    $(`#search_add_to_playlist_${inModal ? 'modal' : 'window'}_modal`).modal('open');
  }
  return (
    <div className="overflow-scroll search-scroll margin-top-10">
      <div className="row">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          { musics.map((music) => {
            return (
              <YoutubeSnippet
                addVideo={addMusicTo}
                playMusicInLibrary={playMusicInLibrary}
                key={music.etag}
                video={music}
                openModal={() => openModal(music)}
                inLibrary={inLibrary}
                />
            );
          })}
        </ReactCSSTransitionGroup>
        {inLibrary ?
          <AddToListWindow id={`search_add_to_playlist_${inModal ? 'modal' : 'window'}_modal`}
            libraryId={libraryId}
            playlists={playlists}
            musicKey={adding && adding.id.videoId} addToPlaylists={addToPlaylists}
            inLibrary={_.find(libraryMusics, { music_key: adding && adding.id.videoId }) ? true : false}
            musicName={adding && adding.snippet.title} />
        :
          <div/>
        }
      </div>
    </div>
  );
}

MusicSearchResults = compose(
  adding,
  dataFormat,
  handlers,
  modalHandlers,
  pure
)(MusicSearchResults)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMusicToRoom, addMusicToLibrary, addMusicToPlaylist }, dispatch);
}
export default connect(null, mapDispatchToProps)(MusicSearchResults);
