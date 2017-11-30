import React from 'react';
import Youtube from 'react-youtube';

const YoutubePlayer = () =>{
  const opts = {
      height: '78',
      width: '128',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
  const onReady = (event) => {
    event.target.pauseVideo();
  }
  return(
    <Youtube
      videoId="2g811Eo7K8U"
      onReady={onReady}
      opts={opts}
      />
  )
}

export default YoutubePlayer
