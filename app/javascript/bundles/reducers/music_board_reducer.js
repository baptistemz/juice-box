import _ from "lodash";
import {
  GOT_ROOM,
  ROOM_STARTED,
  MUSIC_ENDED,
  MUSIC_ADDED,
  MUSIC_DELETED,
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
      const playing = _.filter(action.payload.musics, {state: "playing"})
      const waiting_list = _.filter(action.payload.musics, {state: "waiting"})
      if( playing.length > 1){waiting_list.unshift(playing[1])}
      return { ...state, waiting_list, volume_balance: 0, music_0: playing[0], music_1: waiting_list[0], hidden_player: 1 }
    }
    // case ROOM_STARTED :{
    //   return { ...state, music_1: state.waiting_list[0] }
    // }
    case MUSIC_STARTED:{
      if(action.payload !== state.music_0 && action.payload !== state.music_1){
        const hidden_player = state.hidden_player;
        const waiting_list = state.waiting_list;
        waiting_list.shift()
        return { ...state, waiting_list, hidden_player: hidden_player === 1 ? 0 : 1, [`music_${hidden_player}`]: action.payload }
      }
    }
    case MUSIC_ENDED:{
      return { ...state, [`music_${state.hidden_player}`]: state.waiting_list[0], volume_balance: state.hidden_player === 1 ? 0 : 1 }
    }
    case MUSIC_ADDED:{
      if (action.payload.state === "waiting"){
        if(state.waiting_list.length < 1){
          if(state.volume_balance === 0 || state.volume_balance === 1){
            return { ...state, waiting_list: [...state.waiting_list, action.payload], [`music_${state.hidden_player}`]: action.payload  }
          }else{
            return { ...state, waiting_list: [...state.waiting_list, action.payload] }
          }
        }
        return { ...state, waiting_list: [...state.waiting_list, action.payload]  }
      }else{
        return { ...state, [`music_${state.hidden_player === 0 ? 1 : 0}`]: action.payload, [`music_${state.hidden_player}`]: null }
      }
    }
    case MUSIC_DELETED:{
      const waiting_list = state.waiting_list;
      const index = _.findIndex(waiting_list, ['id', action.payload.music.id])
      return { ...state, waiting_list:[ ...state.waiting_list.slice(0, index), ...state.waiting_list.slice(index + 1) ], [`music_${state.hidden_player}`]: waiting_list[0] }
    }
    case VOLUME_BALANCE_CHANGED:{
      const variation = action.payload.music_number === 1 ? action.payload.amount : (0 - action.payload.amount)
      return { ...state, volume_balance: state.volume_balance + variation }
    }
    case WAITING_LIST_ORDER_CHANGED:{
      const waiting_list = action.payload
      return { ...state, waiting_list, [`music_${state.hidden_player}`]: waiting_list[0] }
    }
    default:
      return state;
  }
}
