import { push } from "react-router-redux";
import { toastr } from 'react-redux-toastr';
import { setNextHeaders } from '../utils/tokenManagement';

export function errorHandling(error, redirect){
  if(!error.response){
    console.log(error);
    toastr.error("An error occured. Please try again or contact us");
  }else{
    console.log(error.response.headers)
    // setNextHeaders(error.response.headers)
    switch (error.response.status) {
      case 404:{
        console.log(error.response)
        redirect("/404");
      }
      default:
        const messages = error.response.data.errors.full_messages || error.response.data.errors;
        for (var i = 0; i < messages.length; i++) {
          toastr.error(messages[i]);
        }
    }
  }
}
