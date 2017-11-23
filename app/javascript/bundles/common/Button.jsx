import React from 'react';

const Button = ({ type, fullWidth, children, icon, clickTrigger, color = "secondary" }) => {
  return (
    <button onClick={clickTrigger} type={ type }
      className={`waves-effect waves-light btn ${fullWidth ? 'full-width' : ''} ${color}-btn`}>
      {icon ?
        <i className="material-icons left">{ icon }</i>
        :
        <div/>
      }
      { children }
    </button>
  );
};

export { Button };
