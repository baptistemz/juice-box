import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { createRoom } from '../actions/index';
import { Input, Button } from '../common/index';

class RoomCreation extends Component{
  submit(value){
    this.props.createRoom(value);
  }
  render(){
    const { handleSubmit, background, topRightCorner, errors } = this.props;
    return (
      <div>
        <form
          id="room_name_form"
          className={`padding-auto justify-center align-items-center ${background} ${topRightCorner ? "top-right-corner" : ""}`}
          onSubmit={handleSubmit(value => this.submit(value))}>
          <p>CREATE A ROOM</p>
          <Input name="name" label="room name" type="text" error={ errors ? errors.name || errors.slug : null }/>
          <Button>Create</Button>
        </form>
      </div>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createRoom }, dispatch);
}

function mapStateToProps({ room }) {
  return {
    errors: room.errors
  }
}

RoomCreation = reduxForm({
  form: 'room_creation'
})(connect(mapStateToProps, mapDispatchToProps)(RoomCreation));

export default RoomCreation;
