import React from 'react';
import YoutubePlayer from '../components/YoutubePlayer';

let LibraryPlayer = ({ width }) => {
  return(
    <YoutubePlayer
      inSideMenu={width > "600"}
      video={{
        id: 630,
        state: "waiting",
        user_id: 1,
        provider: "youtube",
        music_key: "NF-kLy44Hls",
        whole_name: "Daft Punk - Lose Yourself to Dance (Official Version)",
        artist: "Daft Punk",
        song: "Lose Yourself to Dance (Official Version)",
        username: "emile"
      }}
      />
  )
}

export default LibraryPlayer;
