import React from 'react';
import { AddToListWindow } from './index'
import { NavItem, Dropdown, Button } from 'react-materialize'


const MusicListElement = ({ id, music, handleAddClick, handleDeleteClick, addToPlaylists, editItem, name }) => {
  return(
    <a>
      <div className="collection-item-overlay">
        <li onClick={(e) => {console.log("let's play this song", e)}} className="collection-item">
          {name || music.song}
        </li>
        <span onClick={(e) => editItem(e, music)}><i className="material-icons margin-right-10 primary-text left-icon">edit</i></span>
        <Dropdown
          trigger={<i data-activates={id} className="dropdown-button secondary-text material-icons right-icon">more_horiz</i>}
          options={{ alignment: 'right', constrainWidth: false }}
          >
          <NavItem onClick={(e) => handleAddClick(e, music)}><i className="material-icons">playlist_add</i>Add to playlist</NavItem>
          <NavItem onClick={(e) => handleDeleteClick(e, music)}><i className="material-icons">delete</i>Delete from library</NavItem>
        </Dropdown>
      </div>
      <AddToListWindow id={`${id}_modal`}
        musicKey={music.music_key} addToPlaylists={(lists) => addToPlaylists(lists, music)}
        inLibrary={true} musicName={music.song} />
    </a>
  )
}

export { MusicListElement };
