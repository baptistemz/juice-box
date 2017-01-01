import React from 'react';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
  icon: PropTypes.string,
  clickTrigger: PropTypes.func,
  color: PropTypes.string,
  iconOnly: PropTypes.bool,
  disabled: PropTypes.bool
};

export { Button };
