import React, { Component} from 'react';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import NoSleep from '../utils/nosleep.js';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import MusicBoard from "./MusicBoard";
import SearchBoard from "./SearchBoard";
import RoomCreation from '../components/RoomCreation';
import RoomSettings from '../components/RoomSettings';
import RoomUsers from '../components/RoomUsers';
import PlaylistPreview from '../components/PlaylistPreview'
import { fetchRoom, musicEnded, musicAdded, musicStarted, updateRoom, waitingListOrderChanged, musicDeleted, fetchPlaylists, fetchPlaylistMusics, connectUserToRoom, disconnectUserFromRoom, connectedStrangerNumberChanged, addMusicToRoom, addPlaylistToRoom } from '../actions/index'


class Room extends Component {
  constructor(){
    super();
    this.state = {
      alerted: false,
      addedPlaylists: []
    }
  }
  receiveRoomData(data) {
    console.log("DATA RECEIVED", data)
    switch(data.action) {
      case 'added': {
        const { username, whole_name, artist, song } = data.music;
        console.log("ADDED RECEIVED", data)
        const user = username || 'stranger';
        const title = whole_name ? whole_name  : `${artist} - ${song}` ;
        toastr.success(`Music added by ${user}`, title);
        this.props.musicAdded(data.music);
      }
      break;
      case 'updated': {
        console.log('UPDATED RECEIVED', data.music);
        if(data.music.state === "archived"){
          this.props.musicEnded(data.music);
        }
        if(data.music.state === "playing"){
          this.props.musicStarted(data.music);
        }
      }
      break;
      case 'deleted': {
        this.props.musicDeleted(data);
        console.log('deleted received');
      }
      break;
      case 'sorted':{
        console.log('sorted received', data);
        this.props.waitingListOrderChanged(data.musics);
      }
      break;
      case 'added_playlist':{
        console.log('added_playlist received', data);
        this.setState({ addedPlaylists: [...this.state.addedPlaylists, data]})
        toastr.success(`Playlist added by ${data.user}`, data.name);
        this.props.waitingListOrderChanged(data.musics);
      }
      break;
      case 'new_connection':{
        console.log('new_connection received', data);
        this.props.connectUserToRoom(data.user)
      }
      break;
      case 'deleted_connection':{
        console.log('deleted_connection received', data);
        this.props.disconnectUserFromRoom(data.user)
      }
      break;
      case 'connected_stranger_number_changed':{
        console.log('connected_stranger_number_changed received', data);
        this.props.connectedStrangerNumberChanged(data.number)
      }
      break;
    }
  }
  connectChannel(){
    if (typeof App !== 'undefined' && this.props.id) {
      console.log("connecting to", this.props.id)
      App.room = App.cable.subscriptions.create(
        { channel: 'RoomChannel', room_id: this.props.id, user_id: this.props.user_id }, {
          connected: function () { console.log("channel connected") },
          disconnected: function() { console.log ("channel disconnected") },
          received: ((data) => this.receiveRoomData(data))
        }
      );
    }
  }
  disconnectChannel(){
    if (typeof App !== 'undefined') {
      console.log("disconnecting from", this.props.id)
      App.cable.subscriptions.remove(App.room);
    }
  }
  componentWillMount(){
    this.connectChannel()
  }
  componentWillUnmount(){
    this.disconnectChannel()
  }
  componentDidUpdate(previousProps){
    if (previousProps.id !== this.props.id) {
      this.connectChannel()
    }
  }
  componentDidMount(){
    if(this.props.isAuthenticated){this.props.fetchPlaylists()}
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
    const url = this.props.location.pathname
    this.props.fetchRoom(url);
    $('.modal').modal({
      endingTop: "0%",
      ready: (modal, trigger) => {if(_.includes(modal[0].id, "playlist") && this.props.isAuthenticated){
        const id = modal[0].id.split("_")["3"]
        this.props.fetchPlaylistMusics(id)
      }}
    });
    $('.button-collapse').sideNav({
       menuWidth: 300, // Default is 300
       edge: 'right', // Choose the horizontal origin
       closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
       draggable: false, // Choose whether you can drag to open on touch screens,
     }
   );
  }
  renderPlaylistModal(status, id){
    const added = !_.isUndefined(_.find(this.state.addedPlaylists, ['id', id]))
    return(
      <div key={id} id={`${status}_playlist_modal_${id}`} className="room-modal modal">
        <div className="modal-close material-icons margin-5 font-30">clear</div>
        <br/>
        <PlaylistPreview
          ownerPlaylists={this.props.ownerPlaylists}
          addMusicToRoom={this.props.addMusicToRoom}
          addPlaylistToRoom={this.props.addPlaylistToRoom}
          roomId={this.props.id} playlistId={id} added={added} popUp/>
      </div>
    )
  }
  render() {
    const { id, slug, name, owner_name, transition_speed, contributors_number, isAuthenticated, musics, is_owner, ownerPlaylists, publicPlaylists, connectedUsers, connected_stranger_number } = this.props;
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
            <div className="room-nav">
              <div>
                <a href="#" data-activates="slide-out-users" className="button-collapse">
                  <div className="contributors-icon secondary-text"><i className="material-icons">person</i>{connectedUsers.length + connected_stranger_number}</div>
                </a>
                <div id="slide-out-users" className="primary-background side-nav">
                  <div onClick={() => $('.button-collapse').sideNav('hide')} className="pointer material-icons margin-5 font-30">clear</div>
                  <RoomUsers
                    roomId={id}
                    connectedUsers={connectedUsers}
                    connectedStrangerNumber={connected_stranger_number}
                    roomUrl={this.props.location.pathname}
                    />
                </div>
              </div>
              {is_owner && isAuthenticated ?
                <div>
                  <a href="#" data-activates="slide-out-settings" className="button-collapse">
                    <i className="secondary-text material-icons">
                      settings
                    </i>
                  </a>
                  <div id="slide-out-settings" className="primary-background side-nav">
                    <div onClick={() => $('.button-collapse').sideNav('hide')} className="pointer material-icons margin-5 font-30">clear</div>
                    <RoomSettings
                      roomId={id}
                      onTransitionSpeedChange={this.props.updateRoom}
                      transitionSpeed={this.props.transition_speed}
                      ownerPlaylists={ownerPlaylists}
                      publicPlaylists={publicPlaylists}
                      />
                  </div>
                </div>
                :
                ""
              }
            </div>
          </div>
          <hr/>
          <div className="row no-margin">
            <div className="col s12 l6">
              <MusicBoard transitionSpeed={transition_speed} roomId={id} isOwner={is_owner && isAuthenticated}/>
            </div>
            <div className="col s12 l6 hide-on-med-and-down">
              <SearchBoard roomId={id}/>
            </div>
            <a className="hide-on-large-only btn-floating btn-large waves-effect waves-light modal-trigger search-modal-btn" href="#search_modal">
              <i className="material-icons">search</i>
            </a>
            <div id="search_modal" className="room-modal modal">
              <div className="col s12">
                <div className="modal-close material-icons">clear</div>
                <br/>
                <br/>
                <SearchBoard roomId={id}/>
              </div>
            </div>
            {ownerPlaylists.map((playlist) => {return this.renderPlaylistModal("owner", playlist.id)})}
            {publicPlaylists.map((playlist) => {return this.renderPlaylistModal("public", playlist.id)})}
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRoom, musicEnded, musicAdded, musicStarted, updateRoom, waitingListOrderChanged, musicDeleted, fetchPlaylists, fetchPlaylistMusics, connectUserToRoom, disconnectUserFromRoom, connectedStrangerNumberChanged, addMusicToRoom, addPlaylistToRoom }, dispatch);
}

function mapStateToProps({ auth, room: { id, user_id, slug, name, transition_speed, owner_name, contributors_number, is_owner, connectedUsers, connected_stranger_number }, playlist:{ ownerPlaylists, publicPlaylists }}) {
  return {
    id,
    user_id: auth.id,
    slug,
    name,
    transition_speed,
    owner_name,
    contributors_number,
    is_owner,
    isAuthenticated: auth.isAuthenticated,
    ownerPlaylists,
    publicPlaylists,
    connectedUsers,
    connected_stranger_number
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
