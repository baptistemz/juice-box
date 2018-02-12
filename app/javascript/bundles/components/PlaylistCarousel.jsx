import React, {Component} from 'react';
import { fetchPlaylists } from '../actions/index'
import { PlaylistCard } from '../common/index'

class PlaylistCarousel extends Component {
  componentDidMount(){
    $('.carousel').carousel({});
  }
  render(){
    const { status, playlists } = this.props;
    return(
      <div className="carousel">
        {playlists.map((playlist) => {
          return(
            <div key={playlist.id} className="carousel-item">
              <a  className="modal-trigger" href={`#${status}_playlist_modal_${playlist.id}`}>
                <PlaylistCard name={playlist.name} ownerName={playlist.owner_name} picture={null} />
              </a>
            </div>
          )
        })}
      </div>

    )
  }
}

export default PlaylistCarousel;
