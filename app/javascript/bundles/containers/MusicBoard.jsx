import React, {Component} from 'react';
import YoutubePlayer from '../components/YoutubePlayer'

class MusicBoard extends Component {
  render(){
    return(
      <div className="dark-background padding-20">
        <YoutubePlayer />
      </div>
    )
  }
}

export default MusicBoard;
