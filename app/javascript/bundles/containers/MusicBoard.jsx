import React, {Component} from 'react';
import {arrayMove} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import YoutubePlayer from '../components/YoutubePlayer';
import MusicWaitingList from '../components/MusicWaitingList';
import SimulatedPlayer from '../components/SimulatedPlayer';
import { updateMusic, changeVolumeBalance, changeWaitingListOrder } from "../actions/index"


class MusicBoard extends Component {
  constructor(props){
    super(props);
    this.state = { items: props.waiting_list, musicReady: null }
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    if (this.props.isOwner){
      this.props.changeWaitingListOrder(arrayMove(this.state.items, oldIndex, newIndex));
    }else{
      toastr.info("Only the room owner can change the list order")
    }
  };
  transition(music,  music_number){
    const { transitionSpeed, updateMusic, roomId, waiting_list, changeWaitingListOrder, changeVolumeBalance } = this.props
    const newMusicId = waiting_list[0].id
    updateMusic(roomId, newMusicId, {state: "playing"});
    waiting_list.shift()
    changeWaitingListOrder(waiting_list)
    let counter = 0;
    const volumeTransition = function () {
      if (counter < transitionSpeed) {
        if(this.state.musicReady === newMusicId){
          changeVolumeBalance(music_number, 1/transitionSpeed)
          counter += 1;
        }else{
          console.log("ON ATTEND")
        }
      } else {
        updateMusic(roomId, music.id , {state: "archived"})
        clearInterval(volumeTransitionInterval);
      }
    };
    const volumeTransitionInterval = setInterval(volumeTransition.bind(this), 50*transitionSpeed);
  }
  playerReady(music){
    this.setState({ musicReady: music.id })
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
        transitionSpeed={transitionSpeed}
        onReady={this.playerReady.bind(this, music)}
        name={ music.whole_name ? music.whole_name : `${music.artist} - ${music.song}` }
        volumeShare={music_number === 0 ? 1 - volume_balance : volume_balance}
        nextVideo={this.transition.bind(this, music, music_number)}
        buttonsDisabled= {music_0 && music_1}
        />
    }
    return <SimulatedPlayer
      name={ music.whole_name ? music.whole_name : `${music.artist} - ${music.song}` }
      hidden={music_number === this.props.hidden_player}
      buttonsDisabled={true} />
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
