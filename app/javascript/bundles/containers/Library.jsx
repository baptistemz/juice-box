import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { withRouter, Link, Route } from 'react-router-dom';
import LibraryPlayer from './LibraryPlayer';
import LibrarySettings from '../components/Library/LibrarySettings';
import LibraryArtists from '../components/Library/LibraryArtists';
import LibraryArtist from '../components/Library/LibraryArtist';
import LibraryMusics from '../components/Library/LibraryMusics';
import LibraryPlaylists from '../components/Library/LibraryPlaylists';
import LibraryPlaylist from '../components/Library/LibraryPlaylist';
import LibraryNewPlaylist from '../components/Library/LibraryNewPlaylist';
import {Loader} from '../common/index';
import SearchBoard from './SearchBoard';
import { addMusicToLibrary, addMusicToPlaylist, deleteMusicFromLibrary, deleteMusicFromPlaylist, playMusicInLibrary, emptyLibraryPlayer, fetchLibrary } from '../actions/index';

const ACTIVE_TABS_PATH = [
  "/library/artists",
  "/library/artists/",
  "/library/musics",
  "/library/musics/",
  "/library",
  "/library/",
  "/library/search",
  "/library/search/",
  "/library/playlists",
  "/library/playlists/",
  "/"
]

class Library extends Component {
  constructor(props){
    super(props);
    const tabsVisible = _.includes(ACTIVE_TABS_PATH, props.location.pathname)
    let activeTab = ""
    activeTab = props.location.pathname.startsWith("/library/artists") ? "Artists" : activeTab;
    activeTab = props.location.pathname.startsWith("/library/musics") ? "Musics" : activeTab;
    activeTab = props.location.pathname.startsWith("/library/search") ? "Search" : activeTab;
    activeTab = props.location.pathname.startsWith("/") ? "Playlists" : activeTab;
    this.state = { width: '0', tabsVisible, activeTab }
  }
  // componentDidUpdate(lastProps){
  //   if (lastProps.libraryId !== this.props.libraryId){
  //     this.propsthis.props.libraryId)
  //   }
  // }
  componentDidMount(){
    this.props.fetchLibrary(this.props.libraryId)
    const alertOnce = () => {
      if(!this.state.alerted && !( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
        toastr.warning("If juicebox plays in an inactive browser tab, music transitions won't trigger well. We recommend to open juicebox in an independent browser window", {timeOut: 0})
        this.setState({ alerted: true });
      }
    }
    let interval_id = 1;
    $(window).focus(function() {
      if (interval_id === 0){alertOnce()}
    });
    $(window).blur(function() {
      interval_id = 0;
    });
    $('.button-collapse').sideNav({
       menuWidth: 300, // Default is 300
       edge: 'right', // Choose the horizontal origin
       closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
       draggable: false, // Choose whether you can drag to open on touch screens,
     }
   );
   $('#search_modal').modal({ endingTop: "0%" });
   this.setState({ width: window.innerWidth});
   window.addEventListener('resize', () => this.setState({ width: window.innerWidth}));
  }
  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname){
      const tabsVisible = this.props.location.pathname === "/library/artists" ||
                          this.props.location.pathname === "/library/musics" ||
                          this.props.location.pathname === "/" ||
                          this.props.location.pathname === "/library" ||
                          this.props.location.pathname === "/library/search" ||
                          this.props.location.pathname === "/library/playlists"
      this.setState({ tabsVisible });
      $('#search_modal').modal({ endingTop: "0%"  });
    }
  }
  componentWillUnmount(){
    this.props.emptyLibraryPlayer(this.props.libraryId)
  }
  openSearchModal(activeTab, url){
    if($(window).width() > 600){
      this.setState({ activeTab });
      this.props.history.push(url)
    }else{
      $('#search_modal').modal('open');
    }
  }
  goTo(activeTab, url){
    this.setState({ activeTab });
    this.props.history.push(url);
  }
  addMusicTo(destination, music,  playlistId){
    if(destination === "playlist"){
      this.props.addMusicToPlaylist(playlistId, music);
    }else if(destination === "library"){
      this.props.addMusicToLibrary(this.props.libraryId, music);
    }
  }
  deleteMusicFrom(destination, music, playlistId){
    console.log("in deleteMusicFrom")
    if(destination === "playlist"){
      this.props.deleteMusicFromPlaylist(playlistId, music.id);
    }else if(destination === "library"){
      this.props.deleteMusicFromLibrary(this.props.libraryId, music.id);
    }
  }
  playMusicInLibrary(music, fromPlaylist = false){
    this.props.playMusicInLibrary(this.props.libraryId, music, fromPlaylist)
  }
  render() {
    const { handleSubmit, playlists, artists, musics, playerMusics, location, selectedArtist, selectedArtistMusics, libraryId } = this.props;
    console.log("Library musics", musics)
    return (
      <div className="app-background">
        <div className="space-between align-items-end">
          <h1>{this.state.activeTab}</h1>
          <div>
            <div>
              <a href="#" data-activates="slide-out-settings" className="button-collapse margin-right-10">
                <i className="secondary-text material-icons">
                  settings
                </i>
              </a>
              <div id="slide-out-settings" className="primary-background side-nav">
                <div onClick={() => $('.button-collapse').sideNav('hide')} className="pointer material-icons margin-5 font-30">clear</div>
                  <LibrarySettings
                    // onTransitionSpeedChange={}
                    transitionSpeed={15}
                  />
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row no-margin">
          <div className="col s12">
            <div className="row no-margin dark-background padding-10">
              <div className="col s12">
                <div className={`my-music-player ${this.state.tabsVisible ? "" : "tabs-hidden"}`}>
                  <LibraryPlayer playerMusics={playerMusics} width={this.state.width}/>
                </div>
                <div className="my-music-nav">
                  <div className="tabs-vertical">
                    <ul className="hide-on-small-only tabs">
                      <li className="tab"><a onClick={() => this.goTo("Playlists", "/library/playlists")} className={location.pathname.startsWith("/library/playlists") ? "active" : ""}><i className="material-icons">queue_music</i>Playlists</a></li>
                      <li className="tab"><a onClick={() => this.goTo("Artists", "/library/artists")} className={location.pathname.startsWith("/library/artists") ? "active" : ""}><i className="material-icons">person</i>Artists</a></li>
                      <li className="tab"><a onClick={() => this.goTo("Musics", "/library/musics")} className={location.pathname.startsWith("/library/musics") ? "active" : ""}><i className="material-icons">music_note</i>Musics</a></li>
                      <li className="tab"><a onClick={() => this.openSearchModal("Search", "/library/search")} className={location.pathname.startsWith("/library/search") ? "active" : ""}><i className="material-icons">search</i>Search</a></li>
                    </ul>
                  </div>
                  <div className={this.state.tabsVisible ? "hide-on-med-and-up" : "hidden"}>
                    <ul className="tabs">
                      <li className="tab"><a onClick={() => this.goTo("Playlists", "/library/playlists")} className={location.pathname.startsWith("/library/playlists") ? "active" : ""}><i className="material-icons">queue_music</i></a></li>
                      <li className="tab"><a onClick={() => this.goTo("Artists", "/library/artists")} className={location.pathname.startsWith("/library/artists") ? "active" : ""}><i className="material-icons">person</i></a></li>
                      <li className="tab"><a onClick={() => this.goTo("Musics", "/library/musics")} className={location.pathname.startsWith("/library/musics") ? "active" : ""}><i className="material-icons">music_note</i></a></li>
                      <li className="tab"><div onClick={() => this.openSearchModal()} className="pointer"><i className="material-icons">search</i></div></li>
                    </ul>
                  </div>
                </div>
                <div className={`my-music-content-container ${this.state.tabsVisible ? "" : "tabs-hidden"} overflow-scroll`}>
                  <div id="search_modal" className="room-modal modal">
                    <div className="col s12">
                      <div className="modal-close material-icons">clear</div>
                      <br/>
                      <br/>
                      <SearchBoard libraryMusics={musics} inModal libraryId={libraryId} playlists={playlists} inLibrary />
                    </div>
                  </div>
                  <Route exact path="/" render={({ match }) => <LibraryPlaylists match={match} playlists={playlists}/>}/>
                  <Route exact path="/library" render={({ match }) => <LibraryPlaylists match={match} playlists={playlists}/>}/>
                  <Route exact path="/library/playlists" render={({ match }) => <LibraryPlaylists match={match} playlists={playlists}/>} />
                  <Route exact path="/library/search" render={routeProps =>
                      <SearchBoard
                        libraryMusics={musics}
                        libraryId={libraryId}
                        playlists={playlists}
                        playMusicInLibrary={this.playMusicInLibrary.bind(this)}
                        inLibrary
                        inModal={false} />}/>
                  <Route path="/library/new_playlist" component={LibraryNewPlaylist} />
                  <Route path="/library/playlists/:id" render={routeProps =>
                      <LibraryPlaylist
                        playMusicInLibrary={(music) => this.playMusicInLibrary(music, true)}
                        addMusicTo={this.addMusicTo.bind(this)}
                        deleteMusicFrom={this.deleteMusicFrom.bind(this)}
                        openSearch={() => this.openSearchModal("/library/search")} />} />
                  <Route exact path="/library/artists" render={routeProps => <LibraryArtists artists={artists}/>} />
                  <Route path="/library/artists/:id" render={routeProps =>
                      <LibraryArtist
                        libraryId={libraryId}
                        playlists={playlists}
                        selectedArtist={selectedArtist}
                        selectedArtistMusics={selectedArtistMusics}
                        playMusicInLibrary={this.playMusicInLibrary.bind(this)}
                        addMusicTo={this.addMusicTo.bind(this)}
                        deleteMusicFrom={this.deleteMusicFrom.bind(this)} />} />
                  <Route exact path="/library/musics" render={routeProps =>
                      <LibraryMusics
                        libraryId={libraryId}
                        playlists={playlists}
                        musics={musics}
                        playMusicInLibrary={this.playMusicInLibrary.bind(this)}
                        addMusicTo={this.addMusicTo.bind(this)}
                        deleteMusicFrom={this.deleteMusicFrom.bind(this)} /> } />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMusicToLibrary, addMusicToPlaylist, deleteMusicFromLibrary, deleteMusicFromPlaylist, playMusicInLibrary, emptyLibraryPlayer, fetchLibrary }, dispatch);
}

function mapStateToProps({auth, library}) {
  return {
    libraryId: auth.libraryId,
    musics: library.musics,
    playerMusics: library.playerMusics,
    artists: library.artists,
    playlists: library.playlists,
    selectedArtist: library.selectedArtist,
    selectedArtistMusics: library.selectedArtistMusics,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Library));
