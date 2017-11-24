import React from 'react';


class Account extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app-background">
        <div className="container">
          <h1>Account</h1>
        </div>
      </div>
    );
  }
}

export default Account;
