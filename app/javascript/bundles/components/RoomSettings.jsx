import React, {Component} from 'react';

class RoomSettings extends Component {
  constructor(props){
    super(props);
    this.state = {
      transitionSpeed: props.transitionSpeed
    }
  }
  componentWillReceiveProps(nextProps){
    const { transitionSpeed } = nextProps;
    if(transitionSpeed !== this.props.transitionSpeed){
      this.setState({ transitionSpeed });
    }
  }
  onRangeChange(value) {
    const { roomId, onTransitionSpeedChange } = this.props;
    this.setState({ transitionSpeed: value });
    const sendIfRangeHasntChanged = function (value) {
      if (document.getElementById('transition_speed').value === value) {
        onTransitionSpeedChange(roomId, { transition_speed: value });
      }
    };
    setTimeout(sendIfRangeHasntChanged.bind(this, value), 1000);
  }
  componentDidMount(){
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }
  render(){
    const { transitionSpeed } = this.state;
    return(
      <div className="container">
        <h4 id="settings_title">Settings</h4>
        <br/>
        <form>
          <p className="range-field">
            <h5>Transition speed :</h5>
            <input
              id="transition_speed"
              onChange={(e) => this.onRangeChange(e.target.value) }
              type="range" min="0" max="20" value={transitionSpeed} />
            <span>{transitionSpeed} seconds</span>
          </p>
        </form>
        <br/>
        <br/>
        <h5>Load a music playlist in this room</h5>
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s6"><a href="#my_playlists">My playlists</a></li>
              <li className="tab col s6"><a className="active" href="#public_playlists">Public playlists</a></li>
            </ul>
          </div>
          <div id="my_playlists" className="col s12">My playlists</div>
          <div id="public_playlists" className="col s12">Public playlists</div>
        </div>
      </div>
    )
  }
}

export default RoomSettings;
