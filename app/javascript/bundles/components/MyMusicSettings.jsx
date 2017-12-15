import React, {Component} from 'react';

class MyMusicSettings extends Component {
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
        console.log(roomId, { transition_speed: value });
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
              type="range" min="0" max="30" value={transitionSpeed} />
            <span>{transitionSpeed} seconds</span>
          </p>
        </form>
      </div>
    )
  }
}

export default MyMusicSettings;
