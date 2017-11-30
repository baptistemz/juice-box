import axios from 'axios';
import moment from 'moment';
import { getHeadersObject } from '../utils/tokenManagement';
import {
  GOT_YOUTUBE_VIDEOS
} from './types';

const API_KEY = 'AIzaSyDQu8AKJ_hWW3IFxEvchDjfN-JjcofQjUo';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export function fetchYoutubeVideos(term){
    const params = {
      headers: {
        'access-token': null
      },
      part: 'snippet',
      key: API_KEY,
      q: term,
      type: 'video',
      maxResults: 10
    };
    delete axios.defaults.headers.common;
    const request1 = axios.get(ROOT_URL, { params });
    return (dispatch) => {
      request1.then((data) => {
        const ids = data.data.items.map((i) => { return i.id.videoId }).join("%2C");
        const durationUrl = `https://www.googleapis.com/youtube/v3/videos?id=${ids}&part=contentDetails&key=${API_KEY}`;
        const request2 = axios.get(durationUrl);
        request2.then((details) => {
          axios.defaults.headers.common = getHeadersObject(localStorage)
          let count = 0
          data.data.items.map(function(i){
            i['duration'] = moment.duration(details.data.items[count].contentDetails.duration).humanize()
            count+=1
          });
          dispatch(gotYoutubeVideos({ search_term: term, videos: data.data.items }))
        });
      }).catch((error)=> console.log(error.response))
    };
};

function gotYoutubeVideos(data) {
  return {
    type: GOT_YOUTUBE_VIDEOS,
    payload: data
  };
}
