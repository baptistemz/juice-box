import React from 'react';
import { Field } from 'redux-form'

const Input = ({ name, icon, type, value, error, label, autoFocus }) => {
  return (
    <div className="input-field">
      <i className="material-icons prefix">{icon}</i>
      <Field id={name} type={type} value={value} name={name} autoFocus={autoFocus}
        component="input" className={`validate ${error ? 'invalid' : ''}`} placeholder="" />
        <label className="capitalize" htmlFor={name}>
          {label} <span className="red-text">{error ? error : ''}</span>
        </label>
    </div>
  );
};

export { Input };
