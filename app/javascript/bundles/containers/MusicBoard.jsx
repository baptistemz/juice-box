import React, {Component} from 'react';
import YoutubePlayer from '../components/YoutubePlayer';
import MusicWaitingList from '../components/MusicWaitingList';
import {arrayMove} from 'react-sortable-hoc';

class MusicBoard extends Component {
  constructor(){
    super();
    this.state = {
      items: [
        {
          id: 1,
          etag: "5FDJ73B",
          snippet: {
            title: "Kool Koondool"
          }
        },
        {
          id: 2,
          etag: "DHBS83B",
          snippet: {
            title: "Hey Joe"
          }
        },
        {
          id: 3,
          etag: "JHG3DUH",
          snippet: {
            title: "Hurricane"
          }
        },
        {
          id: 4,
          etag: "3KHEB3IDD3",
          snippet: {
            title: "Smoke on the water"
          }
        },
      ]
    }
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render(){
    return(
      <div className="dark-background padding-20">
        <YoutubePlayer />
        <MusicWaitingList
          deleteMusicFromList={(music) => console.log("delete music", music)}
          list={this.state.items}
          roomId={this.props.roomId}
          onSortEnd={this.onSortEnd}
          printListOrder={console.log("print list order")}
        />
      </div>
    )
  }
}

export default MusicBoard;
