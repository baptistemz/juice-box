import React, {Component} from 'react';
import {arrayMove} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import YoutubePlayer from '../components/YoutubePlayer';
import MusicWaitingList from '../components/MusicWaitingList';
import SimulatedPlayer from '../components/SimulatedPlayer';
import { updateMusic, changeVolumeBalance, changeWaitingListOrder, deleteMusicFromRoom, prepareNextSong } from "../actions/index"


class MusicBoard extends Component {
  constructor(props){
    super(props);
    this.state = { items: props.waiting_list, inTransition: false }
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    if (this.props.isOwner){
      const new_items = arrayMove(this.state.items, oldIndex, newIndex)
      this.setState({ items: new_items });
      const room_music_ids = _.map( new_items, "id")
      this.props.changeWaitingListOrder(this.props.roomId, room_music_ids);
    }else{
      toastr.info("Only the room owner can change the list order")
    }
  };
  componentDidUpdate(previousProps){
    if(previousProps.waiting_list !== this.props.waiting_list){
      this.setState({ items: this.props.waiting_list });
    }
  }
  transition(music_number){
    this.setState({ inTransition: true });
    const { transitionSpeed, updateMusic, roomId, waiting_list, changeWaitingListOrder, changeVolumeBalance, prepareNextSong } = this.props;
    const newMusic = this.props[`music_${music_number}`]
    const endingMusic = this.props[music_number === 1 ? "music_0" : "music_1"];
    updateMusic(roomId, newMusic.id, {state: "playing"})
    // waiting_list.shift()
    let counter = 0;
    const volumeTransition = function () {
      if (counter < transitionSpeed) {
        changeVolumeBalance(music_number, 1/transitionSpeed)
        counter += 1;
      } else {
        updateMusic(roomId, endingMusic.id , {state: "archived"})
        // prepareNextSong(this.state.items)
        this.setState({ inTransition: false });
        clearInterval(volumeTransitionInterval);
      }
    };
    const volumeTransitionInterval = setInterval(volumeTransition.bind(this), 50*transitionSpeed);
  }
  musicPlayer(music, music_number){
    const { hidden_player, transitionSpeed, volume_balance, music_0, music_1 } = this.props;
    if(!music){
      return <div />
    }
    if(this.props.isOwner){
      return <YoutubePlayer
        hidden={music_number === hidden_player}
        video={music}
        inTransition={this.state.inTransition}
        transitionSpeed={transitionSpeed}
        name={ music.whole_name ? music.whole_name : `${music.artist} - ${music.song}` }
        volumeShare={music_number === 0 ? 1 - volume_balance : volume_balance}
        nextVideoButton={this.transition.bind(this, music_number)}
        nextVideoAuto={this.transition.bind(this, music_number === 1 ? 0 : 1)}
        />
    }
    return <SimulatedPlayer
      name={ music.whole_name ? music.whole_name : `${music.artist} - ${music.song}` }
      hidden={music_number === this.props.hidden_player}
      buttonsDisabled={true} />
  }
  render(){
    const { deleteMusicFromRoom, roomId, isOwner, music_0, music_1 } = this.props;
    return(
      <div className="dark-background padding-20">
        {this.musicPlayer(music_0, 0)}
        {this.musicPlayer(music_1, 1)}
        <MusicWaitingList
          deleteMusicFromRoom={(music) => deleteMusicFromRoom(roomId, music.id)}
          isOwner={isOwner}
          list={this.state.items}
          roomId={roomId}
          onSortEnd={this.onSortEnd}
          lockAxis="y"
          shouldCancelStart={(e) => {if (['a', 'i'].indexOf(e.target.tagName.toLowerCase()) !== -1){return true}}}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMusic, changeVolumeBalance, changeWaitingListOrder, deleteMusicFromRoom, prepareNextSong }, dispatch);
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
