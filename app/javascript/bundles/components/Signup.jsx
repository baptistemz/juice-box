import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { signupUser, authError } from '../actions/index';
import { Input, Button } from '../common/index';

const sanitize = (field) => {
  const sanitized_field = field ? field.trim() : '';
  return sanitized_field
}
class Signup extends Component{
  componentWillMount(){
    this.props.authError({})
  }
  submit({ username, email, password, password_confirmation }, next_path){
    const creds = { username: sanitize(username),
                    email: sanitize(email) ,
                    password: sanitize(password),
                    password_confirmation: sanitize(password_confirmation) };
    this.props.signupUser(creds, next_path);
  }
  render(){
    const { handleSubmit, errorMessages } = this.props;
    const next_path = this.props.location.state ? this.props.location.state.from : null
    console.log(next_path)
    return (
      <div className="auth-background">
        <a className="pointer" onClick={() => this.props.history.goBack()}>
          <i className="white-text back-icon material-icons">arrow_back</i>
        </a>
        <div className="container">
          <div className="row">
            <div className="col s12 m10 l8 offset-m1 offset-l2">
              <div className="box-shadow padded-50-except-top">
                <form onSubmit={handleSubmit(values => this.submit(values, next_path))}>
                  <div className="text-center padded-20">
                    <h1>Create an account</h1>
                  </div>
                  <Input icon="perm_identity" name="username" label="username" type="text" error={errorMessages["username"]} autoFocus />
                  <Input icon="email" name="email" label="email" type="email" error={errorMessages["email"]} />
                  <Input icon="lock_outline" name="password" label="password"  type="password" error={errorMessages["password"]} />
                  <Input icon="lock_outline" name="password_confirmation" label="password confirmation" type="password" error={errorMessages["password_confirmation"]} />
                  <p className="red-text">{errorMessages.main}</p>
                  <Button fullWidth={true} icon="lock_open" type="submit">sign up</Button>
                </form>
              </div>
            </div>
          </div>
          <div className="text-center margin-bottom-20 text-20">
            <Link to={{ pathname: '/login', state: { from: next_path } }}>Already registered? Log in</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupUser, authError }, dispatch);
}

function mapStateToProps(state) {
  return {
    errorMessages: state.auth.errors
  }
}

export default Signup = reduxForm({
  form: 'signup' // a unique name for this form
})(connect(mapStateToProps, mapDispatchToProps)(Signup));
