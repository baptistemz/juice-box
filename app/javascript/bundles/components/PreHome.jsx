import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { Input, Button } from '../common/index';


class PreHome extends React.Component {
  submit(value){
    console.log("create " + value.room_name)
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="home-background">
        <div className="container">
          <div>
            <form
              id="room_name_form"
              className='padding-auto justify-center align-items-center clear-background'
              onSubmit={handleSubmit(value => this.submit(value))}>
              <p>CREATE YOUR PLAYLIST</p>
              <Input name="room_name" label="room name" type="text"/>
              <Button>Create</Button>
            </form>
          </div>
          <div className="login-btn-group">
            <Link to={"/login"}>
              <Button>Log in</Button>
            </Link>
            <p>OR</p>
            <Link to={"/signup"}>
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
        <h1 id="home_title">The collaborative playlist experience</h1>
        <br/>
        <div className="text-center">
          <Button icon="play_circle_outline" color="primary">Demo</Button>
        </div>
        <img id="home_logo" src="/logo.png" alt=""/>
      </div>
    );
  }
}

PreHome = reduxForm({
  form: 'new_room'
})(PreHome);

export default PreHome;
