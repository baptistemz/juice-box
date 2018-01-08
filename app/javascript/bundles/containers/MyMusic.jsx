import React, { Component } from 'react';
import MyMusicSettings from '../components/MyMusicSettings';
import YoutubePlayer from '../components/YoutubePlayer';
import {Loader} from '../common/index'
import SearchBoard from './SearchBoard';

class MyMusic extends Component {
  constructor(props){
    super(props);
    this.state = { width: '0'}
  }
  componentDidMount(){
    $('.button-collapse').sideNav({
       menuWidth: 300, // Default is 300
       edge: 'right', // Choose the horizontal origin
       closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
       draggable: false, // Choose whether you can drag to open on touch screens,
     }
   );
   this.setState({ width: window.innerWidth});
   window.addEventListener('resize', () => this.setState({ width: window.innerWidth}));
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app-background">
        <div className="space-between align-items-end">
          <h1>My music</h1>
          <div>
            <a href="#" data-activates="slide-out" className="button-collapse">
              <i className="primary-text margin-right-10 material-icons">
                settings
              </i>
            </a>
            <div id="slide-out" className="primary-background side-nav">
              <div onClick={() => $('.button-collapse').sideNav('hide')} className="pointer material-icons">clear</div>
              <MyMusicSettings
                // onTransitionSpeedChange={}
                transitionSpeed={15}
              />
            </div>
          </div>
        </div>
        <hr/>
        <Loader/>
        {/*
        <div className="row no-margin">
          <div className="col s12">
            <div className="row no-margin dark-background">
              <div className="col s12">
                <div className="my-music-side">
                  <div className="padding-top-10">
                    <YoutubePlayer
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
                      />
                  </div>
                  <hr/>
                  <br/>
                  <div className="my-music-nav">
                    <div className="tabs-vertical">
                      <ul className="hide-on-small-only tabs">
                        <li className="tab"><a href="#search" className="active"><i className="material-icons">search</i>Search</a></li>
                        <li className="tab"><a href="#playlists" className=""><i className="material-icons">queue_music</i>Playlists</a></li>
                        <li className="tab"><a href="#artists" className=""><i className="material-icons">person</i>Artists</a></li>
                        <li className="tab"><a href="#musics" className=""><i className="material-icons">music_note</i>Musics</a></li>
                      </ul>
                    </div>
                    <div className="hide-on-med-and-up">
                      <ul className="tabs">
                        <li className="tab"><a href="#search" className="active"><i className="material-icons">search</i></a></li>
                        <li className="tab"><a href="#playlists" className=""><i className="material-icons">queue_music</i></a></li>
                        <li className="tab"><a href="#artists" className=""><i className="material-icons">person</i></a></li>
                        <li className="tab"><a href="#musics" className=""><i className="material-icons">music_note</i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="my-music-content-container">
                  <div id="search" class="col s12">
                    <SearchBoard/>
                  </div>
                  <div id="playlists" class="col s12">Test 2</div>
                  <div id="artists" class="col s12">Test 3</div>
                  <div id="musics" class="col s12">Test 4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    );
  }
}

export default MyMusic;
