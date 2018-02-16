import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link, Route } from 'react-router-dom';
import LibrarySettings from '../components/LibrarySettings';
import YoutubePlayer from '../components/YoutubePlayer';
import LibraryArtists from '../components/LibraryArtists';
import LibraryArtist from '../components/LibraryArtist';
import LibraryMusics from '../components/LibraryMusics';
import LibraryPlaylists from '../components/LibraryPlaylists';
import LibraryPlaylist from '../components/LibraryPlaylist';
import LibraryNewPlaylist from '../components/LibraryNewPlaylist';
import {Loader} from '../common/index';
import SearchBoard from './SearchBoard';
import { fetchLibrary, addMusicToLibrary, addMusicToPlaylist } from '../actions/index';

class Library extends Component {
  constructor(props){
    super(props);
    const tabsVisible = props.location.pathname === "/library/artists" ||
                        props.location.pathname === "/library/musics" ||
                        props.location.pathname === "/" ||
                        props.location.pathname === "/library" ||
                        props.location.pathname === "/library/search" ||
                        props.location.pathname === "/library/playlists"
  let activeTab = ""
  console.log("props.location.pathname", props.location.pathname)
  activeTab = props.location.pathname.startsWith("/library") ? "Playlists" : activeTab;
  activeTab = props.location.pathname.startsWith("/library/artists") ? "Artists" : activeTab;
  activeTab = props.location.pathname.startsWith("/library/musics") ? "Musics" : activeTab;
  activeTab = props.location.pathname.startsWith("/library/search") ? "Search" : activeTab;
    this.state = { width: '0', tabsVisible, activeTab }
  }
  componentDidMount(){
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
   this.props.fetchLibrary(this.props.libraryId)
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
      $('#search_modal').modal({ endingTop: "0%" });
    }
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
  render() {
    const { handleSubmit, playlists, artists, musics, location, selectedArtist, selectedArtistMusics, libraryId } = this.props;
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
            <div className="row no-margin dark-background">
              <div className="col s12">
                <div className={`my-music-player ${this.state.tabsVisible ? "" : "tabs-hidden"}`}>
                  {/*<YoutubePlayer
                    inSideMenu={this.state.width > "600"}
                    video={{
                      id: 630,
                      state: "waiting",
                      user_id: 1,
                      provider: "youtube",
                      music_key: "NF-kLy44Hls",
                      whole_name: "Daft Punk - Lose Yourself to Dance (Official Version)",
                      artist: "Daft Punk",
                      song: "Lose Yourself to Dance (Official Version)",
                      username: "emile"
                    }}
                    />*/}
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
                      <SearchBoard libraryMusics={musics} inModal />
                    </div>
                  </div>
                  <Route exact path="/" render={routeProps => <LibraryPlaylists playlists={playlists}/>}/>
                  <Route exact path="/library" render={routeProps => <LibraryPlaylists playlists={playlists}/>}/>
                  <Route exact path="/library/search" render={routeProps => <SearchBoard libraryMusics={musics} libraryId={libraryId} inLibrary />}/>
                  <Route exact path="/library/playlists" render={routeProps => <LibraryPlaylists playlists={playlists}/>} />
                  <Route path="/library/new_playlist" component={LibraryNewPlaylist} />
                  <Route path="/library/playlists/:id" render={routeProps => <LibraryPlaylist addMusicTo={this.addMusicTo.bind(this)} openSearch={() => this.openSearchModal("/library/search")} />} />
                  <Route exact path="/library/artists" render={routeProps => <LibraryArtists artists={artists}/>} />
                  <Route path="/library/artists/:id" render={routeProps => <LibraryArtist selectedArtist={selectedArtist} selectedArtistMusics={selectedArtistMusics} addMusicTo={this.addMusicTo.bind(this)} />} />
                  <Route exact path="/library/musics" render={routeProps => <LibraryMusics musics={musics} addMusicTo={this.addMusicTo.bind(this)}/>} />
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
  return bindActionCreators({ fetchLibrary, addMusicToLibrary, addMusicToPlaylist }, dispatch);
}

function mapStateToProps({auth, library}) {
  return {
    libraryId: auth.libraryId,
    musics: library.musics,
    artists: library.artists,
    playlists: library.playlists,
    selectedArtist: library.selectedArtist,
    selectedArtistMusics: library.selectedArtistMusics,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Library));
