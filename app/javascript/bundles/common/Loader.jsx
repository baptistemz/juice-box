import React from 'react';
import PropTypes from 'prop-types';
// var ReactLoader = require('react-loaders').Loader;

const Loader = ({ color, style }) => {
  return (
    <div className="spinner-container">
      <div className="spinner" style={style}>
        <div className="rect1" style={{ backgroundColor: color }}></div>
        <div className="rect2" style={{ backgroundColor: color }}></div>
        <div className="rect3" style={{ backgroundColor: color }}></div>
        <div className="rect4" style={{ backgroundColor: color }}></div>
        <div className="rect5" style={{ backgroundColor: color }}></div>
      </div>
    </div>

  )
}

Loader.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
};

export {Loader}
