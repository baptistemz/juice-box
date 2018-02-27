import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MusicSearchResults from '../components/MusicSearchResults'
import { fetchYoutubeVideos } from '../actions/index';

class SearchBoard extends Component {
  constructor(props){
    super(props);
    this.state = { term: "" };
  }
  componentWillReceiveProps(newProps){
    if(newProps.search_term != this.props.search_term){
      this.setState({ term: "" });
      $('#search').blur();
    }
  }
  onInputSubmit(event) {
    event.preventDefault()
    const term = event.target.search_term.value
    this.props.fetchYoutubeVideos(term);
  }
  render(){
    return(
      <div className="col s12 full-screen-container">
        <form onSubmit={this.onInputSubmit.bind(this)}>
          <div className="input-field">
            <input id="search" type="search" name="search_term" value={this.state.term} onChange={(e)=> this.setState({ term: e.target.value })} />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
        </form>
        {
          this.props.search_term ?
            <p className= "no-margin">Results for "{this.props.search_term}"</p>
          :
            <p/>
        }
        <MusicSearchResults
          playMusicInLibrary={this.props.playMusicInLibrary}
          roomId={this.props.roomId}
          libraryId={this.props.libraryId}
          playlists={this.props.playlists}
          musics={this.props.youtube_videos}
          inModal={this.props.inModal}
          inLibrary={this.props.inLibrary}
          libraryMusics={this.props.libraryMusics} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchYoutubeVideos }, dispatch);
}

function mapStateToProps({ music_search }) {
  return {
    youtube_videos: music_search.youtube_videos,
    search_term: music_search.search_term
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBoard);
