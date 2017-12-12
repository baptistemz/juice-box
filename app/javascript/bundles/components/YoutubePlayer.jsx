import React, { Component } from 'react';
import _ from 'lodash';
import Youtube from 'react-youtube';
import ReactPlayer from 'react-player';
import { Button } from '../common/index';

class YoutubePlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      playing: true,
      volume: props.volumeShare,
      inTransition: false,
      duration: 0
    }
  }
  componentDidUpdate(previousProps){
    if(this.props.volumeShare !== previousProps.volumeShare){
      this.setState({ volume: this.props.volumeShare })
    }
  }
  onProgress(status){
    const timeForTransition = this.state.duration - (this.props.transitionSpeed + 5);
    if (status.playedSeconds >= timeForTransition && !this.state.inTransition) {
      this.props.nextVideo()
      this.setState({ inTransition: true });
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
  pause(){
    this.setState({ playing: false });
  }
  play(){
    this.setState({ playing: true });
  }
  render(){
    const { video, name, hidden, nextVideo, buttonsDisabled } = this.props;
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
          onDuration={(duration) => this.onDuration(duration)}
          volume={this.state.volume}
          config={{ youtube: { playerVars: { showinfo: 1 }, preload: true  } }}
        />

        <div className="margin-left-10 space-around direction-column">
          <p className="no-margin two-lines-p">{this.props.name}</p>
          <div className="player-controlls space-between">
            <Button
              disabled={buttonsDisabled}
              icon={`${this.state.playing ? "pause" : "play_arrow"}`}
              iconOnly
              clickTrigger={this.state.playing ? () => this.pause() : () => this.play() }
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
