import React, { Component } from 'react';
import _ from 'lodash';
import Youtube from 'react-youtube';
import ReactPlayer from 'react-player';
import { Button } from '../common/index';

class YoutubePlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      playing: false,
      volume: props.volumeShare,
      duration: 10000000
    }
  }
  componentDidUpdate(previousProps){
    if(this.props.volumeShare !== previousProps.volumeShare){
      this.setState({ volume: this.props.volumeShare })
    }
    if(this.props.video.state === "playing" && previousProps.video.state === "waiting"){
      console.log("Lets PLAY")
      this.setState({ playing: true })
    }
  }
  onProgress(status){
    const timeForTransition = this.state.duration - (this.props.transitionSpeed + 5);
    if (status.playedSeconds >= timeForTransition && !this.props.inTransition) {
      this.props.nextVideoAuto()
    }
  }
  onDuration(duration){
    this.setState({ duration })
  }
  onPause(){
    this.setState({ playing: false });
  }
  onPlay(){
    this.setState({ playing: true });
  }
  nextVideo(){
    this.setState({ playing: true});
    this.props.nextVideoButton()
  }
  render(){
    const { video, name, hidden } = this.props;
    console.log(this.props.name, "is playing ?", this.state.playing)
    return(
      <div>
        <div className={`dark-background direction-row ${hidden ? "hidden" : ""}`}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video.music_key}`}
            playing={this.state.playing}
            onDuration={(duration) => this.onDuration(duration)}
            playsinline
            controls={false}
            width={128}
            height={78}
            onPause={() => this.onPause()}
            onPlay={() => this.onPlay()}
            onError={(error) => console.log(error)}
            onProgress={(status) => this.onProgress(status)}
            volume={this.state.volume}
            config={{ youtube: { playerVars: { showinfo: 1, controls: 1 }, preload: true  } }}
            />

          <div className="margin-left-10 space-around direction-column">
            <p className="no-margin two-lines-p">{this.props.name}</p>
            <a className={`player-controlls ${this.props.inTransition ? "disabled" : ""}`} onClick={this.state.playing ? () => this.onPause() : () => this.onPlay() }>
              <i className="material-icons">{this.state.playing ? "pause" : "play_arrow"}</i>
            </a>
          </div>
        </div>
        <a className={`player-controlls next-btn ${this.props.inTransition ? "disabled" : ""} ${hidden ? "" : "hidden"}`} onClick={() => this.nextVideo()}>
          <i className="material-icons">skip_next</i>
        </a>
      </div>
    )
  }
}

export default YoutubePlayer
