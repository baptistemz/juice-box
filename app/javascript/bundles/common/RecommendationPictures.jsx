import React, { Component } from 'react';

class RecommendationPictures extends Component {
  render(){
    const { pictures } = this.props;
    return(
      <div className="justify-end full-width">
        {pictures.map((picture) => {
          return <img key={picture.url} src={picture.url || "/thumb/default_profile.png"} className="micro-avatar"/>
        })}
      </div>
    )
  }
}

export { RecommendationPictures }
