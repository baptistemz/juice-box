import { toastr } from 'react-redux-toastr';

export function errorHandling(error) {
  if(!error.response){
    console.log(error);
    toastr.error("Une erreur est survenue. Veuillez réessayer plus tard ou nous contacter.");
  }else{
    const messages = error.response.data.errors.full_messages || error.response.data.errors;
    for (var i = 0; i < messages.length; i++) {
      toastr.error(messages[i]);
    }
  }
};
