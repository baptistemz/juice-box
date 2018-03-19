import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link, Route, Router } from 'react-router-dom';
import { Button } from 'react-materialize';
import LibraryMusics from '../components/LibraryMusics';
import LibraryArtist from '../components/LibraryArtist';
import LibraryArtists from '../components/LibraryArtists';
import LibraryPlaylists from '../components/LibraryPlaylists';
import LibraryPlaylist from '../components/LibraryPlaylist';
import SearchBoard from './SearchBoard';
import { addMusicToRoom } from '../actions/index';
import { lifecycle, withState, compose, pure } from 'recompose';

const visibleModal = withState("visibleModal", "setVisibleModal", ({ location, match }) =>{
  return location.pathname !== `/rooms/${match.params.roomId}` && location.pathname !== `/rooms/${match.params.roomId}/`
})

const mobile = withState("mobile", "setMobile", false)

let SearchNavigator = ({
  history,
  location,
  match,
  libraryMusics,
  libraryArtists,
  libraryPlaylists,
  roomId,
  addMusicToRoom,
  selectedArtist,
  selectedArtistMusics,
  addPlaylistToRoom,
  playlistAdded,
  setVisibleModal,
  visibleModal,
  mobile
}) => {
  console.log("SEARCH NAV", history, location, match)
  if(mobile && !visibleModal && location.pathname !== `/rooms/${match.params.roomId}` && location.pathname !== `/rooms/${match.params.roomId}/`){
    console.log("VISIBLE")
    setVisibleModal(true)
  }
  if(mobile && visibleModal && (location.pathname === `/rooms/${match.params.roomId}` || location.pathname === `/rooms/${match.params.roomId}/`)){
    console.log("HIDDEN")
    setVisibleModal(false)
  }
  const splittedUrl = location.pathname.split("/")
  const visibleTabs = !parseInt(splittedUrl[splittedUrl.length - 1]);
  return(
    <div>
      <div className="hide-on-med-and-down">
        {visibleTabs ?
          <div>
            <ul className="tabs tabs-fixed-width">
              <li className="tab"><a onClick={() => history.push(`/rooms/${match.params.roomId}`)} className={location.pathname === `/rooms/${match.params.roomId}` ? "active" : ""}><i className="material-icons">search</i></a></li>
              <li className="tab"><a onClick={() => history.push(`/rooms/${match.params.roomId}/musics`)} className={location.pathname.startsWith(`/rooms/${match.params.roomId}/musics`) ? "active" : ""}><i className="material-icons">music_note</i></a></li>
              <li className="tab"><a onClick={() => history.push(`/rooms/${match.params.roomId}/artists`)} className={location.pathname.startsWith(`/rooms/${match.params.roomId}/artists`) ? "active" : ""}><i className="material-icons">person</i></a></li>
              <li className="tab"><a onClick={() => history.push(`/rooms/${match.params.roomId}/playlists`)} className={location.pathname.startsWith(`/rooms/${match.params.roomId}/playlists`) ? "active" : ""}><i className="material-icons">queue_music</i></a></li>
            </ul>
          </div>
        :
          <div/>
        }
      </div>
      <div className="hide-on-large-only">
        <Button floating fabClickOnly fab='horizontal' icon="search" large style={{ bottom: "84px" }} >
          <Link to={`/rooms/${match.params.roomId}/search`}><Button floating icon='search' /></Link>
          <Link to={`/rooms/${match.params.roomId}/musics`}><Button floating icon='music_note' /></Link>
          <Link to={`/rooms/${match.params.roomId}/artists`}><Button floating icon='person' /></Link>
          <Link to={`/rooms/${match.params.roomId}/playlists`}><Button floating icon='queue_music' /></Link>
        </Button>
      </div>
      <div
        className={`${mobile ? "modal room-modal" : ""}`}
        id={mobile ? "search_navigator_modal" : ""}
        style={{ maxHeight: visibleTabs ? "calc(100vh - 122px)" : "calc(100vh - 90px)" }}>
        <div className="col s12">
          {mobile ?
            <div>
              <div className="modal-close material-icons">clear</div>
              <br/>
            </div>
          :
            <div/>
          }
          <div className="overflow-scroll" style={{ height: `calc(100vh - ${mobile ? "50px" : "122px"})`}}>
            <Route path={`/rooms/${match.params.roomId}/musics`} render={() =>
                <LibraryMusics
                  addMusicToRoom={(m) => addMusicToRoom(roomId, m)}
                  inRoom
                  musics={libraryMusics}
                  />
              }
              />
            <Route exact path={`/rooms/${match.params.roomId}/artists`} render={() =>
                <LibraryArtists
                  inRoom
                  artists={libraryArtists}
                  />
              }
              />
            <Route exact path={`/rooms/${match.params.roomId}/artists/:id`} render={({ match }) =>
              <LibraryArtist
                match={match}
                selectedArtist={selectedArtist}
                selectedArtistMusics={selectedArtistMusics}
                addMusicToRoom={(m) => addMusicToRoom(roomId, m)}
                inRoom
                />
            }
            />
          <Route exact path={`/rooms/${match.params.roomId}/playlists`} render={({ match }) =>
            <LibraryPlaylists
              match={match}
              playlists={libraryPlaylists}
              inRoom
              />
          }
          />
        <Route exact path={`/rooms/${match.params.roomId}/playlists/:id`} render={({ match }) =>
          <LibraryPlaylist
            addPlaylistToRoom={addPlaylistToRoom}
            addMusicToRoom={(m) => addMusicToRoom(roomId, m)}
            match={match}
            playlistAdded={playlistAdded}
            inRoom
            />
        }
        />
      <Route exact path={`/rooms/${match.params.roomId}`} render={routeProps => <SearchBoard roomId={roomId}/>}/>
      <Route exact path={`/rooms/${match.params.roomId}/search`} render={routeProps => <SearchBoard roomId={roomId}/>}/>
          </div>
        </div>
      </div>
    </div>
  )
}

SearchNavigator = lifecycle({
  componentDidMount(){
    const { setMobile, visibleModal, history, match, setVisibleModal } = this.props;
    if(window.innerWidth < 994){
      setMobile(true)
      if(visibleModal){
        setVisibleModal(false)
        history.push(`/rooms/${match.params.roomId}`)
      }
    }
  },
  componentDidUpdate(prevProps){
    if(prevProps.visibleModal && !this.props.visibleModal){
      console.log("prevProps.visibleModal, this.props.visibleModal", prevProps.visibleModal, this.props.visibleModal)
      $('#search_navigator_modal').modal();
      $('#search_navigator_modal').modal('close')
    }
    if(!prevProps.visibleModal && this.props.visibleModal){
      console.log("prevProps.visibleModal, this.props.visibleModal", prevProps.visibleModal, this.props.visibleModal)
      $('#search_navigator_modal').modal({ endingTop:"O%", complete: () => this.props.history.goBack() });
      $('#search_navigator_modal').modal('open')
    }
  }
})(SearchNavigator);

export default compose(
  withRouter,
  visibleModal,
  mobile,
  pure
)(SearchNavigator);
