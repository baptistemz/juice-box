import React from 'react';
import { Field } from 'redux-form'
import PropTypes from 'prop-types';

const MaterializeCheckbox = ({ id, label, checked, clickEvent }) => {
  return(
    <div className="custom-checkbox">
      <input checked={checked} type="checkbox" id={id.toString()} onClick={(e) => clickEvent(e.target.value)} />
      <label htmlFor={id.toString()}>{label}</label>
    </div>
  )
}
const Checkbox = ({ label, id, checked, clickEvent }) => {
  return(
    <div className="col s6 m4">
      <p>
        <Field id={id} name={label} checked={checked} label={label} clickEvent={clickEvent} component={MaterializeCheckbox} />
      </p>
    </div>
  )
}

MaterializeCheckbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  clickEvent: PropTypes.func,
  checked: PropTypes.bool
};

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  clickEvent: PropTypes.func,
  checked: PropTypes.bool
};

export { Checkbox };
