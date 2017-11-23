import React from 'react';


class Dashboard extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app-background">
        <div className="container">
          <h1>Dashboard</h1>
        </div>
      </div>
    );
  }
}

export default Dashboard;
