import React from 'react';
import { Field } from 'redux-form'
import PropTypes from 'prop-types';

const RadioButtons = ({ name, options, label, error }) => {
  return (
    <div>
      <p className='text-center' style={{ marginBottom: 0 }}>{label} <span className="red-text">{error}</span></p>
      <div className="justify-center">
        {
          Object.keys(options).map(function(key) {
            return(
              <p key={key} style={{ margin: 0 }}>
                <Field className='radioinput' name={ name } component="input"
                  type="radio" id={ key } value={ key } />
                <label htmlFor={ key }>{ options[key] }</label>
              </p>
            )
          })
        }
      </div>
    </div>
  );
};

RadioButtons.propTypes = {
  name: PropTypes.string,
  label: PropTypes.bool,
  error: PropTypes.bool,
  options: PropTypes.object
};

export { RadioButtons };
