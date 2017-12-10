import React from 'react';

const Button = ({ type, fullWidth, children, icon, clickTrigger, color = "secondary", iconOnly, disabled }) => {
  return (
    <button onClick={clickTrigger} type={ type }
      className={`${disabled ? "disabled" : ""} waves-effect waves-light btn ${fullWidth ? 'full-width' : ''} ${color}-btn`}>
      {icon ?
        <i className={`material-icons left ${iconOnly ? "icon-only-btn" : ""}`}>{ icon }</i>
        :
        <div/>
      }
      { children }
    </button>
  );
};

export { Button };
