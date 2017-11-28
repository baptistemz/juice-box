import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RoomCreation } from '../common/index';
import Sidenav from './Sidenav';
import { fetchRoom } from '../actions/index'


class Room extends Component {
  componentWillMount(){
    const url = this.props.location.pathname
    this.props.fetchRoom(url);
  }
  render() {
    const { id,user_id, slug, name, owner, contributors_number } = this.props;
    return (
      <div>
        <div className="app-background">
          <div className="direction-row align-items-end">
            <h1>{name}</h1>
            <p className="no-margin">by {owner}</p>
          </div>
          <hr/>
          <div className="container">
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRoom }, dispatch);
}

function mapStateToProps({ room: { id,user_id, slug, name, owner, contributors_number }}) {
  return {
    id,
    user_id,
    slug,
    name,
    owner,
    contributors_number
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
