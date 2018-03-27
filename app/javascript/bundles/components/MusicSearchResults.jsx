import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withState, withHandlers, compose, pure } from 'recompose';
import { browserHistory } from 'react-router';
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
        addMusicToLibrary(libraryId, params);
        break;
      case "playlist":
        addMusicToPlaylist(id, params);
        break;
      default:
        return
    }
  },
  playMusicInLibrary: ({ getMusicParams, playMusicInLibrary }) => (music) => {
    const params = getMusicParams(music);
    playMusicInLibrary(params);
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
  addToPlaylists: ({ addMusicTo }) => (lists, video) => {
    let ids = _.keys(_.pickBy(lists))
    console.log("IDS", ids, video)
    if(lists[`${video.id.videoId}_library`] && !lists[`${video.id.videoId}_already_in_library`]){
      console.log("ADDMUSIC TO LIBRARAY")
      // addMusicTo("library", video);
      _.pull(ids, `${video.id.videoId}_library`);
    }
    ids.map(id =>{
      const splittedId = id.split("_")
      if( splittedId[1] !== "already" && splittedId[1] !== "library" && !lists[`${splittedId[0]}_already_in_${splittedId[1]}`]){
        // console.log("ADDMUSIC TO PLAYLIST")
        addMusicTo("playlist", video, splittedId[1])
      }
    })
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
            musicKey={adding && adding.id.videoId} addToPlaylists={(lists) => addToPlaylists(lists, adding)}
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
