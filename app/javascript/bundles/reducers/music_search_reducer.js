import {
  GOT_YOUTUBE_VIDEOS
} from '../actions/types';

const INITIAL_STATE = {
  search_term: "",
  youtube_videos: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_YOUTUBE_VIDEOS:{
      const { search_term, videos } = action.payload;
      return { ...state, search_term, youtube_videos: videos};
    }
    default:
      return state;
  }
}
