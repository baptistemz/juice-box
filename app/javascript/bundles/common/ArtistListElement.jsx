import React from 'react';
import { Link } from 'react-router-dom';

const ArtistListElement = ({ artist, match, inRoom, editItem }) => {
  console.log("ArtistListElement", `${match.url}/${artist.id}`, inRoom)
  return(
    <Link to={`${match.url}/${artist.id}`}>
      <div className="collection-item-overlay">
        <li className="collection-item">
          <p className="align-items-center">
            {artist.name}
          </p>
          {inRoom ?
            <div/>
            :
            <span onClick={(e) => editItem(e, artist)}><i className="left-icon material-icons margin-right-10 primary-text">edit</i></span>
          }
          <i className="secondary-text material-icons right-icon">keyboard_arrow_right</i>
        </li>
      </div>
    </Link>
  )
}

export { ArtistListElement };
