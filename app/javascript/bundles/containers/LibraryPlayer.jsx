import React from 'react';
import { withState, compose, lifecycle, pure } from 'recompose';
import YoutubePlayer from '../components/YoutubePlayer';

const playing = withState('playing', "setPlaying", true)

let LibraryPlayer = ({ width, playerMusics, onPause, onPlay, transition, playing, setPlaying }) => {
  let name = ""
  if(playerMusics[0]){
    name = playerMusics[0].whole_name ? playerMusics[0].whole_name : `${playerMusics[0].artist} - ${playerMusics[0].song}`
  }
  console.log("name", name)
  return(
    <YoutubePlayer
      inSideMenu={width > "600"}
      video={playerMusics[0] || {}}
      // hidden={music_number === hidden_player}
      // inTransition={this.state.inTransition}
      // transitionSpeed={transitionSpeed}
      name={name}
      // volumeShare={music_number === 0 ? 1 - volume_balance : volume_balance}
      // nextVideoButton={() =>transition(music_number)}
      // nextVideoAuto={() => transition(music_number === 1 ? 0 : 1)}
      onPlay={() => console.log(true)}
      onPause={() => console.log(false)}
      musicPlaying={playing}
      />
  )
}
LibraryPlayer = lifecycle({
  componentWillReceiveProps(nextProps) {
    if(this.props.playerMusics[0] !== nextProps.playerMusics[0]){
      console.log("OUIIIII")
      this.props.setPlaying(true);
    }
  }
})(LibraryPlayer);

export default compose(
  playing,
  pure
)(LibraryPlayer);
