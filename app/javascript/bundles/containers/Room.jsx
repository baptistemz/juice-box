import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import MusicBoard from "./MusicBoard";
import SearchBoard from "./SearchBoard";
import { RoomCreation } from '../common/index';
import { fetchRoom } from '../actions/index'


class Room extends Component {
  componentDidMount(){
    const url = this.props.location.pathname
    this.props.fetchRoom(url);
    $('.modal').modal({
      endingTop: "0%"
    });
  }
  render() {
    const { id, user_id, slug, name, owner_name, contributors_number, isAuthenticated } = this.props;
    return (
      <div>
        <div className="app-background">
          <div className="direction-row align-items-end">
            {isAuthenticated ?
              <Link to="/rooms"><i className="material-icons margin-left-10 secondary-text">arrow_back</i></Link>
            :
              <div/>
            }
            <h1>{name}</h1>
            <p className="no-margin">by {owner_name}</p>
          </div>
          <hr/>
          <div className="row">
            <div className="col s12 l6">
              <MusicBoard roomId={id}/>
            </div>
            <div className="col s12 l6 hide-on-med-and-down">
              <SearchBoard roomId={id}/>
            </div>
            <a className="hide-on-large-only btn-floating btn-large waves-effect waves-light modal-trigger search-modal-btn" href="#search_modal">
              <i className="material-icons">search</i>
            </a>
            <div id="search_modal" className="app-background modal">
              <div className="col s12">
                <div className="modal-close material-icons">clear</div>
                <br/>
                <SearchBoard roomId={id}/>
              </div>
            </div>
          </div>
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

function mapStateToProps({ auth, room: { id, user_id, slug, name, owner_name, contributors_number }}) {
  return {
    id,
    user_id,
    slug,
    name,
    owner_name,
    contributors_number,
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
