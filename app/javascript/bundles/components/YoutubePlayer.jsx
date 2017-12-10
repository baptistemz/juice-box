import React, { Component } from 'react';
import _ from 'lodash';
import Youtube from 'react-youtube';
import { Button } from '../common/index';

const OPTS = {
  height: '78',
  width: '128',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

class YoutubePlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      player: null,
      playerState: 0,
      playerVolume: `${100 * props.volumeShare}`,
      ended: false
    }
  }
  componentDidUpdate(previousProps){
    this.setVolume(`${100 * this.props.volumeShare}`)
  }
  onReady(event) {
    event.target.setVolume(this.state.playerVolume)
    event.target.playVideo();
    this.setState({
      player: event.target,
    });
    const player = this.state.player;
    if (this.props.isFirstMusic) {
      player.playVideo();
    }
    this.detectEnd(player);
  }
  detectEnd(player) {
    const etag = player.etag;
    const updateTime = function (video) {
      let videoTime = 0;
      const oldTime = videoTime;
      if (this.state.ended || video.getCurrentTime() === video.getDuration()) {
        clearInterval(fadeLoop);
      } else {
        const transitionTime = video.getDuration() - 20;
        if (video && video.getCurrentTime()) {
          videoTime = video.getCurrentTime();
        }
        if (videoTime !== oldTime) {
          const progress = this.onProgress(Math.trunc(videoTime), Math.trunc(transitionTime));
          console.log("progress", progress)
          if (!progress) {
            console.log(progress)
            clearInterval(fadeLoop);
          }
        }
      }
    };
    const fadeLoop = setInterval(updateTime.bind(this, player), 1000);
  }
  onProgress(currentTime, transitionTime) {
    console.log("currentTime", currentTime)
    console.log("transitionTime", transitionTime)
    if (currentTime >= transitionTime) {
      this.props.nextVideo()
      return false;
    }
    return true;
  }
  onStateChange(e){
    this.setState({ player: e.target ,playerState: e.target.getPlayerState(), playerVolume: e.target.getVolume()})
    switch (e.data) {
      case -1:
        break;
      case 0:
        this.setState({ ended: true });
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        this.onReady(event);
        break;
      default:
        break;
    }
  }
  setVolume(value){
    const player = this.state.player;
    if(!_.isEmpty(player))player.setVolume(value)
  }
  pauseVideo(){
    const player = this.state.player;
    player.pauseVideo()
    this.setState({ playerState: player.getPlayerState() });
  }
  playVideo(){
    const player = this.state.player;
    player.playVideo()
    this.setState({ playerState: player.getPlayerState() });
  }
  onVolumeChange(volume){
    const player = this.state.player;
    player.setVolume(volume);
    this.setState({ playerVolume: player.getVolume() });
  }
  render(){
    const { video, name, hidden, nextVideo, buttonsDisabled } = this.props;
    return(
      <div className={`dark-background direction-row ${hidden ? "hidden" : ""}`}>
        <Youtube
          onError={(error) => console.log(error)}
          videoId={video.music_key}
          onReady={this.onReady.bind(this)}
          opts={OPTS}
          onStateChange={this.onStateChange.bind(this)}
          />
        <div className="margin-left-10 space-around direction-column">
          <p className="no-margin">{this.props.name}</p>
          <div className="space-around">
            <Button
              disabled={buttonsDisabled}
              icon={`${this.state.playerState === 1 ? "pause" : "play_arrow"}`}
              iconOnly
              clickTrigger={this.state.playerState === 1 ? this.pauseVideo.bind(this) : this.playVideo.bind(this) }
              />
            <Button
              disabled={buttonsDisabled}
              icon="skip_next"
              iconOnly
              clickTrigger={() => nextVideo()}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default YoutubePlayer
