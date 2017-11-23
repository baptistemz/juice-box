import React from 'react';

const Loader = (props) => {
  return (
    <div className="loader-container" style = { props.background ? {backgroundColor: "white", position: "fixed", right: 0, left: 0, bottom: 0, top: 0, zIndex: 50} : {}}>
      <span className="loader">
        <span className="loader-inner"></span>
      </span>
    </div>
  );
};

export { Loader };
