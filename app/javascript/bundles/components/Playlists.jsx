import React from 'react';


class Playlists extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app-background">
        <div className="container">
          <h1>Playlists</h1>
        </div>
      </div>
    );
  }
}

export default Playlists;
