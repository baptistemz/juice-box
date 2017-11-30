import React, { Component } from 'react';

class MyMusic extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="app-background">
          <h1>My Music</h1>
          <hr/>
          <div className="container">
          </div>
        </div>
      </div>
    );
  }
}

export default MyMusic;
