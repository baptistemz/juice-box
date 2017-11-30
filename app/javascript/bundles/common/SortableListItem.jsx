import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';

class ListItem extends Component {
  deleteFromList(music) {
    this.props.deleteMusicFromList(music);
  }
  render() {
    console.log(this.props)
    const childProps = this.props.children;
    const { ...otherProps } = this.props;
    return (
      <li className="collection-item movable">
        <div className="primary-content">
          <img src="/youtube_icon.png" alt="" className="avatar" />
          <span className="margin-left-10">
            {childProps.snippet.title}
            <p>youtube</p>
          </span>
        </div>
        <a className="secondary-content" onClick={this.deleteFromList.bind(this, childProps)}>
          <i className="material-icons">delete</i>
        </a>
      </li>
    );
  }
}
export default SortableElement(ListItem);
