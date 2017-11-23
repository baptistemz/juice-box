import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import ReduxToastr from 'react-redux-toastr';
import PreHome from '../components/PreHome';
import PasswordForgotten from '../components/PasswordForgotten';
import NewPassword from '../components/NewPassword';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import history from '../store/history';



class Routes extends Component{
  render(){
    const Home = this.props.isAuthenticated ? Dashboard : PreHome;
    return(
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route path="/new_password" component={NewPassword} />
          <Route exact path="/password_forgotten" component={PasswordForgotten}/>
        </div>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Routes);
