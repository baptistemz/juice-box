import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { loginUser, authError } from '../../actions/index';
import { Input, Button } from '../../common/index';

const sanitize = (field) => {
  // REMOVES USELESS SPACES
  const sanitized_field = field ? field.trim() : '';
  return sanitized_field
}

class Login extends Component{
  componentWillMount(){
    this.props.authError({})
  }
  componentDidMount() {
    if(this.props.location.state
      && this.props.location.state.redirected){
        toastr.info("Veuillez vous connecter pour réaliser cette action")
    }
  }
  submit({ email, password }, next_path){
    const creds = { email: sanitize(email), password: sanitize(password) };
    this.props.loginUser(creds, next_path);
  }
  render(){
    const { handleSubmit, errorMessages } = this.props;
    const next_path = this.props.location.state ? this.props.location.state.from : null
    return (
        <div className="auth-background">
          <a className="pointer" onClick={() => this.props.history.goBack()}>
            <i className="white-text back-icon material-icons">arrow_back</i>
          </a>
          <div className="container">
            <div className="row">
              <div className="text-center padded-20">
                <h2>Log in</h2>
                <br/>
              </div>
              <div className="col s10 m8 l6 offset-s1 offset-m2 offset-l3">
                <div className="box-shadow padded-50-except-top">
                  <form onSubmit={handleSubmit(values => this.submit(values, next_path))}>
                    <Input icon="email" name="email" label="email" type="email" autoFocus />
                    <Input icon="lock_outline" name="password" label="password" type="password" />
                    <p className="red-text">{errorMessages.main ? errorMessages.main : ''}</p>
                    <Button fullWidth={true} icon="lock_open" type="submit">Log in</Button>
                  </form>
                </div>
              </div>
            </div>
            <div className="text-center margin-top-20 margin-bottom-20 text-20">
              <Link to={{ pathname: '/password_forgotten', state: { from: next_path } }}>Password forgotten</Link>
              <br/>
              <Link to={{ pathname: '/signup', state: { from: next_path } }}>No account yet? Create one !</Link>
            </div>
          </div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser, authError }, dispatch);
}

function mapStateToProps(state) {
  return { errorMessages: state.auth.errors}
}

export default reduxForm({
  form: 'login'
})(connect(mapStateToProps, mapDispatchToProps)(Login));
