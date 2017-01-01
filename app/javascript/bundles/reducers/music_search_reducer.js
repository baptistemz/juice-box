import {
  GOT_YOUTUBE_VIDEOS,
  SEARCH_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  search_term: "",
  youtube_videos: [],
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_LOADING:{
      return { ...state, loading: true };
    }
    case GOT_YOUTUBE_VIDEOS:{
      const { search_term, videos } = action.payload;
      return { ...state, search_term, youtube_videos: videos, loading: false };
    }
    default:
      return state;
  }
}
