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
      duration: 0
    }
  }
  componentDidUpdate(previousProps){
    if(this.props.volumeShare !== previousProps.volumeShare){
      this.setState({ volume: this.props.volumeShare })
    }
    if(this.props.video.state === "playing" && previousProps.video.state === "waiting"){
      console.log("LET's Play !!")
      this.setState({ playing: true })
    }
  }
  onProgress(status){
    const timeForTransition = this.state.duration - (this.props.transitionSpeed + 5);
    if (status.playedSeconds >= timeForTransition && !this.props.inTransition) {
      this.props.nextVideo()
    }
  }
  onDuration(duration){
    this.setState({ duration })
  }
  onStart(){
    _.delay(() => this.props.onReady(this.props.video), 2000)
  }
  onPause(){
    this.setState({ playing: false });
  }
  onPlay(){
    this.setState({ playing: true });
  }
  render(){
    const { video, name, hidden, nextVideo } = this.props;
    return(
      <div className={`dark-background direction-row ${hidden ? "hidden" : ""}`}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video.music_key}`}
          playing={this.state.playing}
          onProgress={(status) => this.onProgress(status)}
          controls={false}
          width={128}
          height={78}
          onStart={() => this.onStart()}
          onPause={() => this.onPause()}
          onPlay={() => this.onPlay()}
          onError={(error) => console.log(error)}
          onDuration={(duration) => this.onDuration(duration)}
          volume={this.state.volume}
          config={{ youtube: { playerVars: { showinfo: 1, controls: 1 }, preload: true  } }}
        />

        <div className="margin-left-10 space-around direction-column">
          <p className="no-margin two-lines-p">{this.props.name}</p>
          <div className="player-controlls space-between">
            <a disabled={this.props.inTransition} onClick={this.state.playing ? () => this.onPause() : () => this.onPlay() }>
              <i className="material-icons">{this.state.playing ? "pause" : "play_arrow"}</i>  
            </a>
            <a disabled={this.props.inTransition} onClick={() => nextVideo()}>
              <i className="material-icons">skip_next</i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default YoutubePlayer
