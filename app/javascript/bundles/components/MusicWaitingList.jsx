import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SortableListItem from '../common/SortableListItem';

class MusicWaitingList extends Component {
  render() {
    const listItems = this.props.list.map((music, i) => {
      return (
        <SortableListItem
          key={i}
          index={i}
          outline="list"
          deleteMusicFromList={this.props.deleteMusicFromList}
        >{music}</SortableListItem>
      );
    }, this);
    return (
      <div className="">
        <div className="room-music-list overflow-scroll">
          <ul className="collection">
            <ReactCSSTransitionGroup
              transitionName="fade-right"
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
}

export default SortableContainer(MusicWaitingList);
