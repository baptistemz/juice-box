import React, { Component} from 'react';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import NoSleep from 'nosleep.js';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import MusicBoard from "./MusicBoard";
import SearchBoard from "./SearchBoard";
import { RoomCreation } from '../common/index';
import RoomSettings from '../components/RoomSettings';
import { fetchRoom, musicEnded, musicAdded, musicStarted, updateRoom } from '../actions/index'


class Room extends Component {
  receiveRoomData(data) {
    console.log("DATA RECEIVED", data)
    switch(data.action) {
      case 'added': {
        const { username, whole_name, artist, song } = data.music;
        console.log("ADDED RECEIVED", data)
        const user = username || 'stranger';
        const title = whole_name ? whole_name  : `${artist} - ${song}` ;
        toastr.success(`music added by ${user}`, title);
        this.props.musicAdded(data.music);
      }
        break;
      case 'updated':
        console.log('UPDATED RECEIVED', data.music);
        if(data.music.state === "archived"){
          this.props.musicEnded(data.music);
        }
        if(data.music.state === "playing"){
          this.props.musicStarted(data.music);
        }
        break;
      case 'deleted':
        this.props.receiveDeletedMusic(data);
        console.log('deleted received');
        break;
      case 'sorted':
        this.props.receiveSortedMusics(data);
        console.log('sorted received');
        break;
    }
  }
  componentWillMount(){
    if (typeof App !== 'undefined') {
      App.room = App.cable.subscriptions.create(
        { channel: 'RoomChannel', room_id: this.props.id }, {
        connected: function () { console.log("channel connected") },
        disconnected: function() { console.log ("channel disconnected") },
        received: ((data) => this.receiveRoomData(data))
      });
    }
  }
  componentDidMount(){
    const url = this.props.location.pathname
    this.props.fetchRoom(url);
    $('.modal').modal({
      endingTop: "0%"
    });
    $('.button-collapse').sideNav({
       menuWidth: 300, // Default is 300
       edge: 'right', // Choose the horizontal origin
       closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
       draggable: false, // Choose whether you can drag to open on touch screens,
     }
   );
  }
  render() {
    const { id, user_id, slug, name, owner_name, transition_speed, contributors_number, isAuthenticated, musics, is_owner } = this.props;
    const noSleep = new NoSleep();
    noSleep.enable();
    return (
      <div>
        <div className="app-background">
          <div className="space-between align-items-end">
            <div className="direction-row align-items-end">
              {isAuthenticated ?
                <Link to="/rooms"><i className="material-icons margin-left-10 secondary-text">arrow_back</i></Link>
                :
                <div/>
              }
              <h1>{name}</h1>
              <p className="no-margin">by {owner_name}</p>
            </div>
            {is_owner ?
              <div>
                <a href="#" data-activates="slide-out" className="button-collapse">
                  <i className="primary-text margin-right-10 material-icons">
                    settings
                  </i>
                </a>
                <div id="slide-out" className="primary-background side-nav">
                  <div onClick={() => $('.button-collapse').sideNav('hide')} className="pointer material-icons">clear</div>
                  <RoomSettings
                    roomId={id}
                    onTransitionSpeedChange={this.props.updateRoom}
                    transitionSpeed={this.props.transition_speed}
                  />
                </div>
              </div>
              :
              <div/>
            }
          </div>
          <hr/>
          <div className="row">
            <div className="col s12 l6">
              <MusicBoard transitionSpeed={transition_speed} roomId={id} isOwner={this.props.is_owner}/>
            </div>
            <div className="col s12 l6 hide-on-med-and-down">
              <SearchBoard roomId={id}/>
            </div>
            <a className="hide-on-large-only btn-floating btn-large waves-effect waves-light modal-trigger search-modal-btn" href="#search_modal">
              <i className="material-icons">search</i>
            </a>
            <div id="search_modal" className="app-background modal">
              <div className="col s12">
                <div className="modal-close material-icons">clear</div>
                <br/>
                <SearchBoard roomId={id}/>
              </div>
            </div>
          </div>
          <div className="container">
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRoom, musicEnded, musicAdded, musicStarted, updateRoom }, dispatch);
}

function mapStateToProps({ auth, room: { id, user_id, slug, name, transition_speed, owner_name, contributors_number, is_owner }}) {
  return {
    id,
    user_id,
    slug,
    name,
    transition_speed,
    owner_name,
    contributors_number,
    is_owner,
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
