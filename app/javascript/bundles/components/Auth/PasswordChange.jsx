import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Input, Button } from '../../common/index';
import { toastr } from 'react-redux-toastr';
import { updatePassword } from '../../actions/index'

class PasswordChange extends Component {
  submit(values){
    if(values.password === values.password_confirmation){
      this.props.updatePassword(values)
    }else{
      toastr.error("Le nouveau mot de passe et la confirmation ne sont pas identiques")
    }
  }
  componentDidMount(){
    $('.modal').modal();
  }
  render(){
    const { handleSubmit, errorMessages } = this.props;
    return(
      <div className="justify-center">
        <div className="modal-trigger" data-target="password_modal"><button className="waves-effect waves-light full-width btn">Password change</button></div>
        <div id="password_modal" className="modal">
          <div className="modal-content">
            <div className="text-center">
              <h2>Change your password</h2>
            </div>
            <form onSubmit={handleSubmit(values => this.submit(values))}>
              <Input icon="lock_outline" name="current_password" label="current password" error={errorMessages["current_password"]} type="password" />
              <Input icon="lock_outline" name="password" label="new password" type="password" error={errorMessages["password"]} />
              <Input icon="lock_outline" name="password_confirmation" label="new password confirmation" type="password"  error={errorMessages["password_confirmation"]}/>
              <Button fullWidth={true} icon="lock_open" type="submit">Change password</Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePassword }, dispatch);
}

PasswordChange = reduxForm({
  form: 'password_change'
})(connect(null, mapDispatchToProps)(PasswordChange));


export default PasswordChange;
