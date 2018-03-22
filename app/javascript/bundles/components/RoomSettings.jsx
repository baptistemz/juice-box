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
    $('ul.tabs').tabs({
      onShow: function(tab) {
        $('.carousel').carousel();
      }
    });
  }
  render(){
    const { transitionSpeed } = this.state;
    return(
      <div className="container">
        <h4 id="settings_title">Settings</h4>
        <br/>
        <form>
          <h5>Transition speed :</h5>
          <p className="range-field">
            <input
              id="transition_speed"
              onChange={(e) => this.onRangeChange(e.target.value) }
              type="range" min="1" max="30" value={transitionSpeed} />
            <span>{transitionSpeed} seconds</span>
          </p>
        </form>
      </div>
    )
  }
}

export default RoomSettings;
