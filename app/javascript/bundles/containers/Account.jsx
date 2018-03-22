import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PictureUpdate from '../components/PictureUpdate';
import { EditableField, Button, Loader } from '../common/index';
import PasswordChange from '../components/Auth/PasswordChange';
import { updateProfile, authError, logoutUser } from '../actions/index';

class Account extends Component {
  constructor(props){
    super(props);
    console.log("Account constructor", props)
    this.state = { loading: !props.email };
  }
  componentWillMount(){
    this.props.authError({})
  }
  componentDidUpdate(previousProps){
    if (this.props.email && !previousProps.email){this.setState({ loading: false })};
  }
  changeProfileField(type, text) {
    const data = {};
    data[type] = text;
    this.props.updateProfile(data, `Your ${type} has been set to "${text}"`);
  }
  logout(event){
    event.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { username, email, vehicles, errorMessages } = this.props;
    return (
      <div>
        <div className="app-background">
          <h1>Account</h1>
          <hr/>
          <div className="container">
            <div className="app-centered-content">
              <div className="row">
                <div className="col s6 m4 margin-bottom-20">
                  <EditableField
                    label="username"
                    type="username"
                    onSubmit={this.changeProfileField.bind(this)}
                    value={username}
                    error={errorMessages["first_name"]}
                    />
                </div>
                <div className="col s6 m4">
                  <EditableField
                    label="email"
                    type="email"
                    onSubmit={this.changeProfileField.bind(this)}
                    value={email}
                    error={errorMessages["email"]}
                    />
                </div>
                <div className="col s12 m4">
                  <div style={{ height: "70px" }} className="align-items-center justify-center">
                    <PasswordChange errorMessages={errorMessages} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12 offset-m3 m6">
                  <PictureUpdate />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile, authError, logoutUser }, dispatch);
}

function mapStateToProps({ auth }) {
  return {
    errorMessages: auth.errors,
    email: auth.email,
    username: auth.username
  }
}

export default connect(mapStateToProps,  mapDispatchToProps)(Account);
