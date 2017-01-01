import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SortableListItem from '../common/SortableListItem';

const MusicWaitingList = ({ list, deleteMusicFromRoom, isOwner }) => {
  const listItems = list.map((music, i) => {
    return (
      <SortableListItem
        key={i}
        index={i}
        outline="list"
        deleteMusicFromRoom={deleteMusicFromRoom}
        isOwner={isOwner}
        >{music}</SortableListItem>
    );
  }, this);
  return (
    <div className="">
      <div className="room-music-list overflow-scroll">
        <ul className="collection">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            >
            {listItems}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    </div>
  );
}

export default SortableContainer(MusicWaitingList);
