import React from 'react';
import { AddToListWindow } from './index'
import { NavItem, Dropdown, Button } from 'react-materialize'


const MusicListElement = ({
  id,
  music,
  handleAddClick,
  handleDeleteClick,
  addToPlaylists,
  editItem,
  name,
  playMusicInLibrary,
  libraryId,
  addMusicToRoom,
  playlists,
  inRoom
}) => {
  if(music.playing){
    console.log("YESSSSSSSS", music)
  }
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
            <li onClick={(e) => {playMusicInLibrary(music)}} className="collection-item">
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
            <AddToListWindow id={`${id}_modal`}
              musicKey={music.music_key} addToPlaylists={(lists) => addToPlaylists(lists, music)}
              libraryId={libraryId} playlists={playlists}
              inLibrary={true} musicName={music.song} />
          </div>
        }
    </a>
  )
}

export { MusicListElement };
