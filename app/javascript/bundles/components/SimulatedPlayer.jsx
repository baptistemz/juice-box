import React from 'react';
import { Button } from '../common/index';

const SimulatedPlayer = ({ hidden, buttonsDisabled, name }) => {
  return(
    <div className={`dark-background direction-row ${hidden ? "hidden" : ""}`}>
      <div className="simulated-player">
        <div id="equalizer-container" className="margin-right-20">
          <div className="active equalizer" />
        </div>
      </div>
      <div className="margin-left-10 space-around direction-column">
        <p className="no-margin"><big>{name}</big></p>
      </div>
    </div>
  )
}

export default SimulatedPlayer;
