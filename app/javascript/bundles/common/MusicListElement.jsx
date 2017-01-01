import React from 'react';
import { NavItem, Dropdown } from 'react-materialize'
import PropTypes from 'prop-types';

const MusicListElement = ({
  id,
  music,
  handleAddClick,
  handleDeleteClick,
  editItem,
  name,
  playMusicInLibrary,
  addMusicToRoom,
  inRoom
}) => {
  return(
    <a>
        { inRoom ?
          <div className="collection-item-overlay">
            <li className="collection-item">
              <p className="truncate">{name || music.song}</p>
            </li>
            <a className="secondary-content" onClick={() => addMusicToRoom(music)}><i className="material-icons">playlist_add</i></a>
          </div>
        :
          <div className="collection-item-overlay">
            <li onClick={() => {playMusicInLibrary()}} className="collection-item">
              <p className={`truncate ${music.playing ? "secondary-text" : ""}`}>{name || music.song}</p>
            </li>
            <span onClick={(e) => editItem(e, music)}>
              <i className={`material-icons margin-right-10 ${music.playing ? "secondary-text" : "primary-text"} left-icon`}>edit</i>
            </span>
            <Dropdown
              trigger={<i data-activates={id} className="dropdown-button secondary-text material-icons right-icon">more_horiz</i>}
              options={{ alignment: 'right', constrainWidth: false }}
              >
              <NavItem onClick={(e) => handleAddClick(e, music)}><i className="material-icons">playlist_add</i>Add to playlist</NavItem>
              <NavItem onClick={(e) => handleDeleteClick(e, music)}><i className="material-icons">delete</i>Delete from library</NavItem>
            </Dropdown>

          </div>
        }
    </a>
  )
}

MusicListElement.propTypes = {
  id: PropTypes.string,
  music: PropTypes.object,
  handleAddClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  editItem: PropTypes.func,
  name: PropTypes.string,
  playMusicInLibrary: PropTypes.func,
  addMusicToRoom: PropTypes.func,
  inRoom: PropTypes.bool,
};

export { MusicListElement };
