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
      console.log(musics)
      const playing = _.filter(musics, {state: "playing"})
      const waiting_list = _.filter(musics, {state: "waiting"})
      return { ...state, waiting_list, volume_balance: 0, music_0: playing[0], music_1: waiting_list[0], hidden_player: 1 }
    }
    case MUSIC_ENDED:{
      console.log(action)
      return state
    }
    case MUSIC_ADDED:{
      if (action.payload.state === "waiting"){
        if(state.waiting_list.includes(action.payload)){
          return state
        } else if(state.waiting_list.length < 1){
          return { ...state, waiting_list: [...state.waiting_list, action.payload], [`music_${state.hidden_player}`]: action.payload  }
        }
        return { ...state, waiting_list: [...state.waiting_list, action.payload]  }
      }else{
        return { ...state, music_0: action.payload, music_1: null }
      }
    }
    case MUSIC_STARTED:{
      console.log("music started reducer: new hidden player",  state.hidden_player === 1 ? 0 : 1 )
      const hidden_player = state.hidden_player;
      return { ...state, hidden_player: hidden_player === 1 ? 0 : 1, [`music_${hidden_player}`]: action.payload }
    }
    case VOLUME_BALANCE_CHANGED:{
      const variation = action.payload.music_number === 1 ? (0 - action.payload.amount) : action.payload.amount
      return { ...state, volume_balance: state.volume_balance + variation}
    }
    case WAITING_LIST_ORDER_CHANGED:{
      const waiting_list = action.payload
      return { ...state, waiting_list, [`music_${state.hidden_player}`]: action.payload[0]}
    }
    default:
      return state;
  }
}
