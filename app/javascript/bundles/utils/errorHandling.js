import { push } from "react-router-redux";
import { toastr } from 'react-redux-toastr';
import { logoutUser } from '../actions/index'
import { setNextHeaders } from './tokenManagement';

export function errorHandling(error, dispatchAction){
  if(!error.response){
    console.log(error)
    toastr.error("An error occured. Please try again or contact us");
  }else{
    console.log(error.response)
    if(error.response.headers['access-token']){setNextHeaders(error.response.headers)}
    switch (error.response.status) {
      case 404:{
        console.log(error.response)
        dispatchAction(push("/404"));
      }
      case 401:{
        console.log("401 !!!", error.response)
        dispatchAction(logoutUser());
      }
      default:
        const full_messages = error.response.data.errors.full_messages
        const messages = error.response.data.errors;
        const message_keys = Object.keys(messages)
        if(full_messages){
          for (var i = 0; i < message_keys.length; i++) {
            toastr.error(full_messages[i][0]);
          }
        }else{
          for (var i = 0; i < message_keys.length; i++) {
            toastr.error(messages[message_keys[i]][0]);
          }
        }
    }
  }
}
