import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withState, withHandlers, compose, pure } from 'recompose';
import { Button } from 'react-materialize';
import MusicSearchResults from '../components/MusicSearchResults'
import { fetchYoutubeVideos } from '../actions/index';


const term = withState('term', 'setTerm', '')

const handlers = withHandlers({
  onInputSubmit: ({ setTerm, fetchYoutubeVideos }) => (event) => {
    event.preventDefault()
    setTerm("");
    const term = event.target.search_term.value
    fetchYoutubeVideos(term);
  }
})

let SearchBoard = ({ search_term, onInputSubmit, term, setTerm, playMusicInLibrary, roomId, libraryId, playlists, youtube_videos, inModal, inLibrary, libraryMusics }) => {
  return(
    <div className="col s12 full-screen-container">
      <form onSubmit={onInputSubmit.bind(this)}>
        <div className="space-between">
          <div className="input-field full-width">
            <input id="search" type="search" name="search_term" value={term} onChange={(e)=> setTerm(e.target.value)} />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
          <Button type="submit" style={{
              height: "42px",
              marginTop: "13px",
              marginLeft: "10px"
            }} icon='search'/>
        </div>
      </form>
      {
        search_term ?
          <p className= "no-margin">Results for "{search_term}"</p>
        :
          <p/>
      }
      <MusicSearchResults
        playMusicInLibrary={playMusicInLibrary}
        roomId={roomId}
        libraryId={libraryId}
        playlists={playlists}
        musics={youtube_videos}
        inModal={inModal}
        inLibrary={inLibrary}
        libraryMusics={libraryMusics}
      />
    </div>
  )
}

SearchBoard = compose(
  term,
  handlers,
  pure
)(SearchBoard)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchYoutubeVideos }, dispatch);
}

function mapStateToProps({ music_search }) {
  return {
    youtube_videos: music_search.youtube_videos,
    search_term: music_search.search_term
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBoard);
