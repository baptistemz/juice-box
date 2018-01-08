import React from 'react';
var ReactLoader = require('react-loaders').Loader;

const Loader = ({ color, style }) => {
  return (
    <div className="spinner-container">
      <div class="spinner" style={style}>
        <div class="rect1" style={{ backgroundColor: color }}></div>
        <div class="rect2" style={{ backgroundColor: color }}></div>
        <div class="rect3" style={{ backgroundColor: color }}></div>
        <div class="rect4" style={{ backgroundColor: color }}></div>
        <div class="rect5" style={{ backgroundColor: color }}></div>
      </div>
    </div>

  )
}

export {Loader}
