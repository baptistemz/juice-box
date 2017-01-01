import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeLibraryVolumeBalance, updateLibraryPlayerMusic } from '../actions/index';
import YoutubePlayer from '../components/YoutubePlayer';


class LibraryPlayer extends Component {
  constructor(props){
    super(props);
    this.state = { inTransition: false, playing: true }
  }
  transition(music_number){
    this.setState({ inTransition: true });
    const { transitionSpeed, updateLibraryPlayerMusic, libraryId, changeLibraryVolumeBalance } = this.props;
    const newMusic = this.props[`music_${music_number}`]
    const endingMusic = this.props[music_number === 1 ? "music_0" : "music_1"];
    if(newMusic){
      console.log("before updateLibraryPlayerMusic, newMusic", newMusic)
      updateLibraryPlayerMusic(libraryId, newMusic.id, {status: "playing"})
    }
    let counter = 0;
    const volumeTransition = function () {
      if (counter < transitionSpeed) {
        changeLibraryVolumeBalance(music_number, 1/transitionSpeed)
        counter += 1;
        console.log("TRANSITION", counter, transitionSpeed)
      } else {
        console.log("updateRoomMusic")
        updateLibraryPlayerMusic(libraryId, endingMusic.id , {status: "archived"})
        this.setState({ inTransition: false });
        clearInterval(volumeTransitionInterval);
      }
    };
    const volumeTransitionInterval = setInterval(volumeTransition.bind(this), 50*transitionSpeed);
  }
  onPlay(){
    this.setState({ playing: true })
  }
  onPause(){
    this.setState({ playing: false })
  }
  musicPlayer(music, music_number){
    const { hidden_player, transitionSpeed, volume_balance } = this.props;
    let video = music || {}
      return <YoutubePlayer
        inSideMenu={this.props.width > "600"}
        hidden={music_number === hidden_player}
        video={video}
        inTransition={this.state.inTransition}
        transitionSpeed={transitionSpeed}
        name={ video.whole_name ? video.whole_name : `${video.artist} - ${video.song}` }
        volumeShare={music_number === 0 ? 1 - volume_balance : volume_balance}
        nextVideoButton={this.transition.bind(this, music_number)}
        nextVideoAuto={this.transition.bind(this, music_number === 1 ? 0 : 1)}
        onPlay={this.onPlay.bind(this)}
        onPause={this.onPause.bind(this)}
        musicPlaying={this.state.playing}
        />
  }
  render(){
    const { music_0, music_1 } = this.props;
    return(
      <div>
        {this.musicPlayer(music_0, 0)}
        {this.musicPlayer(music_1, 1)}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeLibraryVolumeBalance, updateLibraryPlayerMusic }, dispatch);
}

function mapStateToProps({ library: { music_0, music_1, volume_balance, hidden_player }}) {
  return {
    music_0,
    hidden_player,
    music_1,
    volume_balance
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPlayer);
