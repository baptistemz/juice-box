import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class YoutubePlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      playing: props.musicPlaying,
      volume: props.volumeShare,
      duration: 10000000
    }
  }
  componentDidUpdate(previousProps){
    if(this.props.volumeShare !== previousProps.volumeShare){
      this.setState({ volume: this.props.volumeShare })
    }
    if(this.props.video.state === "playing" && previousProps.video.state === "waiting"){
      this.setState({ playing: true })
    }
    if(previousProps.musicPlaying === null && this.props.musicPlaying === true && !this.state.playing){
      // we are in the hidden player and the room is starting playing for the first time since last refresh
      this.setState({playing: true})
    }
  }
  onProgress(status){
    const timeForTransition = this.state.duration - (this.props.transitionSpeed + 5);
    if (status.playedSeconds >= timeForTransition && !this.props.inTransition) {
      this.props.nextVideoAuto()
    }
    if(status.playedSeconds > 3 && !this.props.inTransition && this.props.hidden){
      //This player has started to work around an autoplay block by youtube, it should now stop
      console.log("STOP PLAYER STARTED FOR AUTOPLAY WORKAROUND")
      this.setState({ playing: false })
    }
  }
  onDuration(duration){
    this.setState({ duration })
  }
  onPause(){
    this.props.onPause();
    this.setState({ playing: false });
  }
  onPlay(){
    this.props.onPlay();
    this.setState({ playing: true });
  }
  nextVideo(){
    this.setState({ playing: true});
    this.props.nextVideoButton()
  }
  render(){
    const { video, name, hidden, inSideMenu } = this.props;
    // console.log("video", video)
    return(
      <div>
        {video && video.music_key ?
          <div>
            <div id="player_group" className={`dark-background ${inSideMenu ? "side-player" : ""} ${hidden ? "hidden" : ""}`}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video.music_key}`}
                playing={this.state.playing}
                onDuration={(duration) => this.onDuration(duration)}
                playsinline
                controls={false}
                width={140}
                height={78}
                onPause={() => this.onPause()}
                onPlay={() => this.onPlay()}
                onProgress={(status) => this.onProgress(status)}
                volume={this.state.volume}
                config={{ youtube: { playerVars: { showinfo: 1, controls: 1, playbackRate:1 }  } }}
                />
              <br/>
              <div className="player-content">
                <p className={`no-margin two-lines-p ${hidden ? "hidden" : ""} ${inSideMenu ? "hidden" : ""}`}>{this.props.name}</p>
                <a className={`player-controlls ${this.props.inTransition ? "disabled" : ""}`} onClick={this.state.playing ? () => this.onPause() : () => this.onPlay() }>
                  <i className="material-icons">{this.state.playing ? "pause" : "play_arrow"}</i>
                </a>
              </div>
              <p className={`no-margin two-lines-p ${hidden ? "hidden" : ""} ${inSideMenu ? "" : "hidden"}`}>{this.props.name}</p>
            </div>
            <a className={`player-controlls next-btn ${this.props.inTransition ? "disabled" : ""} ${inSideMenu ? "side-menu-next-btn" : "" } ${hidden ? "" : "hidden"}`} onClick={() => this.nextVideo()}>
              <i className="material-icons">skip_next</i>
            </a>
          </div>
        :
        <div>
          <div id="player_group" className={`dark-background ${inSideMenu ? "side-player" : ""} ${hidden ? "hidden" : ""}`}>
            <div className="empty-player">
              <i className='material-icons'>play_circle_filled</i>
            </div>
            <div className="player-content">
              <p className={`no-margin two-lines-p ${hidden ? "hidden" : ""} ${inSideMenu ? "hidden" : ""}`}>____________ - ____________</p>
              <a className="player-controlls disabled" onClick={this.state.playing ? () => this.onPause() : () => this.onPlay() }>
                <i className="material-icons">{this.state.playing ? "pause" : "play_arrow"}</i>
              </a>
            </div>
          </div>
          <p className={`no-margin two-lines-p ${hidden ? "hidden" : ""} ${inSideMenu ? "" : "hidden"}`}>_________ - _________</p>
        </div>
        }
      </div>
    )
  }
}

export default YoutubePlayer
