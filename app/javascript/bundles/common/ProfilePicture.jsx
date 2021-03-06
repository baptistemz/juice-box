import React from 'react';
import PropTypes from 'prop-types';

const ProfilePicture = ({ imgSrc, small }) => {
  const style = small ? {maxWidth: '60px', maxHeight: '60px', minWidth: '60px', minHeight: '60px'} : {maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'};
  return (
    <img className="avatar" style={style}
      src={imgSrc || "/avatar.png"} alt="profile picture"/>
  );
}

ProfilePicture.propTypes = {
  imgSrc: PropTypes.string,
  small: PropTypes.bool
};

export { ProfilePicture };
