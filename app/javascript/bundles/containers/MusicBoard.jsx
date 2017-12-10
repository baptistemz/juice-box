import React, {Component} from 'react';
import {arrayMove} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import YoutubePlayer from '../components/YoutubePlayer';
import MusicWaitingList from '../components/MusicWaitingList';
import { updateMusic, changeVolumeBalance, changeWaitingListOrder } from "../actions/index"


class MusicBoard extends Component {
  constructor(props){
    super(props);
    this.state = { items: props.waiting_list }
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    if (this.props.isOwner){
      this.props.changeWaitingListOrder(arrayMove(this.state.items, oldIndex, newIndex));
    }else{
      toastr.info("Only the room owner can change the list order")
    }
  };
  transition(duration, music,  music_number){
    this.props.updateMusic(this.props.roomId, this.props.waiting_list[0].id, {state: "playing"})
    const waiting_list = this.props.waiting_list
    waiting_list.shift()
    this.props.changeWaitingListOrder(waiting_list)
    let counter = 0;
    const volumeTransition = function () {
      if (counter < duration) {
        this.props.changeVolumeBalance(music_number, 1/duration)
        counter += 1;
      } else {
        this.props.updateMusic(this.props.roomId, music.id , {state: "archived"})
        clearInterval(volumeTransitionInterval);
      }
    };
    const volumeTransitionInterval = setInterval(volumeTransition.bind(this), 1000);
  }

  musicPlayer(music, music_number){
    if(!music){
      return <div />
    }
    return <YoutubePlayer
      hidden={music_number === this.props.hidden_player}
      video={music}
      name={ music.whole_name ? music.whole_name : `${music.artist} - ${music.song}` }
      volumeShare={music_number === 0 ? 1 - this.props.volume_balance : this.props.volume_balance}
      nextVideo={this.transition.bind(this, 10, music, music_number)}
      buttonsDisabled= {this.props.music_0 && this.props.music_1}
      />
  }
  render(){
    return(
      <div className="dark-background padding-20">
        {this.musicPlayer(this.props.music_0, 0)}
        {this.musicPlayer(this.props.music_1, 1)}
        <MusicWaitingList
          deleteMusicFromList={(music) => console.log("delete music", music)}
          list={this.props.waiting_list}
          roomId={this.props.roomId}
          onSortEnd={this.onSortEnd}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMusic, changeVolumeBalance, changeWaitingListOrder }, dispatch);
}

function mapStateToProps({ music_board: { waiting_list, music_0, music_1, volume_balance, hidden_player }}) {
  return {
    waiting_list,
    music_0,
    hidden_player,
    music_1,
    volume_balance
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicBoard);
