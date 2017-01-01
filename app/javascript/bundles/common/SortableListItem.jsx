import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';

const ListItem = ({ children, deleteMusicFromRoom, isOwner }) => {
  const deleteFromList = (music) => {
    deleteMusicFromRoom(music);
  }
  return (
    <li className="collection-item movable">
      <div className="primary-content">
        <img src="/youtube_icon.png" alt="" className="avatar" />
        <span className="margin-left-10 two-lines-p">
          {children.whole_name ? children.whole_name : `${children.artist} - ${children.song}`}
          <p>{children.provider}</p>
        </span>
      </div>
      {
        isOwner ?
          <a className="secondary-content" onClick={() => deleteFromList(children)}>
            <i className="material-icons">delete</i>
          </a>
        :
          <div/>
      }
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
  deleteMusicFromRoom: PropTypes.func,
  isOwner: PropTypes.bool
};

export default SortableElement(ListItem);
