import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { updatePassword } from '../actions/index';
import { Input, Button } from '../common/index';

class NewPassword extends Component{
  submit(values){
    const search = this.props.location.search; // params contained in url string
    const params = new URLSearchParams(search);
    if(values.password === values.password_confirmation){
      this.props.updatePassword(values, params)
    }else{
      toastr.error("Le nouveau mot de passe et la confirmation ne sont pas identiques")
    }
  }
  render(){
    const { handleSubmit, errorMessages } = this.props;
    return (
      <div className="app-background">
        <div className="center-page-content">
          <div className="container">
            <br />
            <div className="row">
              <div className="col s12 m8 l6 offset-m2 offset-l3">
                <form onSubmit={handleSubmit(values => this.submit(values))}>
                  <Input icon="lock_outline" name="password" label="new password" type="password" />
                  <Input icon="lock_outline" name="password_confirmation" label="password confirmation" type="password" />
                  <p className="red-text">{errorMessages.main ? errorMessages.main : ''}</p>
                  <Button fullWidth={true} icon="lock_open" type="submit">Change password</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePassword }, dispatch);
}

function mapStateToProps(state) {
  return { errorMessages: state.auth.errors}
}

export default reduxForm({
  form: 'new_password'
})(connect(mapStateToProps, mapDispatchToProps)(NewPassword));
