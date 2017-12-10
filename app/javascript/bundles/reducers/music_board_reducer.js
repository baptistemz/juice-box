import _ from "lodash";
import {
  GOT_ROOM,
  MUSIC_ENDED,
  MUSIC_ADDED,
  MUSIC_STARTED,
  VOLUME_BALANCE_CHANGED,
  WAITING_LIST_ORDER_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  hidden_player: 1,
  volume_balance: 0,
  music_0: null,
  music_1: null,
  waiting_list: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_ROOM:{
      const { musics } = action.payload;
      const playing = _.filter(musics, {state: "playing"})
      const waiting_list = _.filter(musics, {state: "waiting"})
      return { ...state, waiting_list, volume_balance: 0, music_0: playing[0], music_1: null, hidden_player: 1 }
    }
    case MUSIC_ENDED:{
      if(action.payload.id === state.music_1.id){
        return { ...state, music_1: null  }
      }else{
        return { ...state, music_0: null  }
      }
    }
    case MUSIC_ADDED:{
      if (action.payload.state === "waiting"){
        return { ...state, waiting_list: [...state.waiting_list, action.payload]  }
      }else{
        return { ...state, music_0: action.payload, music_1: null }
      }
    }
    case MUSIC_STARTED:{
      if(state.music_1){
        return { ...state, music_0: action.payload, hidden_player: 1 }
      }else if(state.music_0){
        return { ...state, music_1: action.payload, hidden_player: 0 }
      }else{
        return { ...state, music_0: action.payload, music_1: null }
      }
    }
    case VOLUME_BALANCE_CHANGED:{
      const variation = action.payload.music_number === 1 ? (0 - action.payload.amount) : action.payload.amount
      return { ...state, volume_balance: state.volume_balance + variation}
    }
    case WAITING_LIST_ORDER_CHANGED:{
      const waiting_list = action.payload
      return { ...state, waiting_list}
    }
    default:
      return state;
  }
}
