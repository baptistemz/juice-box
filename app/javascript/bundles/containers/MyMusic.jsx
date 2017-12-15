import React, { Component } from 'react';
import MyMusicSettings from '../components/MyMusicSettings'

class MyMusic extends Component {
  componentDidMount(){
    $('.button-collapse').sideNav({
       menuWidth: 300, // Default is 300
       edge: 'right', // Choose the horizontal origin
       closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
       draggable: false, // Choose whether you can drag to open on touch screens,
     }
   );
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app-background">
        <div className="space-between align-items-end">
          <h1>My music</h1>
          <div>
            <a href="#" data-activates="slide-out" className="button-collapse">
              <i className="primary-text margin-right-10 material-icons">
                settings
              </i>
            </a>
            <div id="slide-out" className="primary-background side-nav">
              <div onClick={() => $('.button-collapse').sideNav('hide')} className="pointer material-icons">clear</div>
              <MyMusicSettings
                // onTransitionSpeedChange={}
                transitionSpeed={15}
              />
            </div>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}

export default MyMusic;
