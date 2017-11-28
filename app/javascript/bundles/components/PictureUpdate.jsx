import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProfile, validateToken } from '../actions/index';
import { Loader, ProfilePicture } from '../common/index';
import getBase64 from '../utils/getBase64'

class PictureUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingImage: false }
  }
  componentWillReceiveProps(nextProps){
    let loadingImage = !(nextProps.profile_picture);
    if (nextProps.profile_picture === null){loadingImage = false};
    this.setState({ loadingImage })
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ loadingImage: true });
      this.props.updateProfile({ profile_picture: reader.result }).then(()=>{
        this.props.validateToken();
      })
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render(){
    const img = this.state.loadingImage ? <Loader/> : <ProfilePicture imgSrc={this.props.profile_picture} />
    return (
      <div className="picture-update-group justify-center">
        <div style={{marginRight: "20px"}}>
          <h5>Your profile picture</h5>
          <label htmlFor={"file"} className="fileLabel"><div className="btn">Choose a picture</div></label>
          <input id="file" className="fileInput"
            type="file"
            onChange={(e) => this.handleImageChange(e)} />
        </div>
        <div className="thumb-image-container">
          {img}
        </div>
      </div>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile, validateToken }, dispatch);
}

function mapStateToProps(state) {
  return {
    profile_picture: state.auth.profile_picture.thumb.url
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureUpdate);
