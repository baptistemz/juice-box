import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilePicture extends Component {
  render(){
    const { imgSrc } = this.props
    const style = this.props.small ? {maxWidth: '60px', maxHeight: '60px', minWidth: '60px', minHeight: '60px'} : {maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'};
    return (
      <img className="avatar" style={style}
        src={imgSrc || "/avatar.png"} alt="profile picture"/>
    );
  }
}

export { ProfilePicture };
