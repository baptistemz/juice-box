import { push } from "react-router-redux";
import { toastr } from 'react-redux-toastr';
import { logoutUser } from '../actions/index'
import { setNextHeaders } from './tokenManagement';

export function errorHandling(error, dispatchAction){
  if(!error.response){
    toastr.error("An error occured. Please try again or contact us");
  }else{
    console.log(error.response.headers)
    // setNextHeaders(error.response.headers)
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
        const messages = error.response.data.errors.full_messages || error.response.data.errors;
        for (var i = 0; i < messages.length; i++) {
          toastr.error(messages[i]);
        }
    }
  }
}
