import React from 'react';
import { reduxForm } from 'redux-form';
import { Input, Button } from './index';

let RoomCreation = (props) => {
  const { handleSubmit } = props;
  const submit = (value) => {console.log(value)}
  return (
    <div>
      <form
        id="room_name_form"
        className='padding-auto justify-center align-items-center clear-background'
        onSubmit={handleSubmit(value => submit(value))}>
        <p>CREATE YOUR PLAYLIST</p>
        <Input name="room_name" label="room name" type="text"/>
        <Button>Create</Button>
      </form>
    </div>
  );
};

RoomCreation = reduxForm({
  form: 'room_creation'
})(RoomCreation);

export { RoomCreation };
