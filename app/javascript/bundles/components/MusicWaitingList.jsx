import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SortableListItem from '../common/SortableListItem';

class MusicWaitingList extends Component {
  render() {
    console.log(this.props)
    const smallListItems = this.props.list.map((item) => {
      return (
        <li className="waiting-list-icon" key={item.etag}>
          <img src="/youtube_icon.png" alt="" className="circle avatar-sizing" />
          <p className="hover-chip truncate">
            {item.snippet.title}
          </p>
        </li>
      );
    });
    const listItems = this.props.list.map((item, i) => {
      return (
        <SortableListItem
          key={i}
          index={i}
          outline="list"
          deleteMusicFromList={this.props.deleteMusicFromList}
        >{item}</SortableListItem>
      );
    }, this);
    return (
      <div className="">
        <div>
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
