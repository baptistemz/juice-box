import React, { Component } from 'react';
import Sidenav from './Sidenav';

class Dashboard extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="app-background">
          <h1>Dashboard</h1>
          <hr/>
          <div className="container">
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
