import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RoomCreation from '../components/RoomCreation';
import { RoomCard } from '../common/index';
import { fetchRooms } from '../actions/index'

class RoomList extends Component {
  componentDidMount(){
    console.log("RoomLiST DID mOuNt ")
    this.props.fetchRooms();
  }
  contributorRooms(){
    const { contributorRoomList } = this.props;
    if(contributorRoomList.length === 0){
      return <span className="margin-left-10">You haven't contributed to any music room yet.</span>
    }
    return contributorRoomList.map((room, index) => {
      return <RoomCard
        key={index}
        name={room.name}
        contributorsNumber={room.contributorsNumber}
        playing= {room.playing}
        ownerName={room.owner_name}
        slug={room.slug} />
    })
  }
  ownerRooms(){
    const { ownerRoomList } = this.props;
    if(ownerRoomList.length === 0){
      return <span className="margin-left-10">You haven't created any music room yet.</span>
    }
    return ownerRoomList.map((room, index) => {
      return <RoomCard
        key={index}
        name={room.name}
        contributorsNumber={room.contributorsNumber}
        playing= {room.playing}
        ownerName={room.owner_name}
        slug={room.slug} />
    })
  }
  render() {
    return (
      <div>
        <div className="app-background">
          <h1>RoomList</h1>
          <hr className="margin-bottom-20"/>
          <div className="container">
            <RoomCreation topRightCorner={false} background="dark-background" />
            <h3 className="margin-left-10">Your rooms</h3>
            <div className="room-list-container">
              {this.ownerRooms()}
              <div className="gradient-wrapper-left">
                <div className="gradient-border-left"></div>
              </div>
              <div className="gradient-wrapper-right">
                <div className="gradient-border-right"></div>
              </div>
            </div>
            <h3 className="margin-left-10">Rooms you contributed to</h3>
            <div className="room-list-container">
              {this.contributorRooms()}
              {this.props.contributorRoomList.length > 0 ?
                <div>
                  <div className="gradient-wrapper-left">
                    <div className="gradient-border-left"></div>
                  </div>
                  <div className="gradient-wrapper-right">
                    <div className="gradient-border-right"></div>
                  </div>
                </div>
              :
                <div/>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRooms }, dispatch);
}

function mapStateToProps({ room:{ ownerRoomList, contributorRoomList } }) {
  return {
    ownerRoomList,
    contributorRoomList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
