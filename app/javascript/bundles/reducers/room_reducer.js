import {
  ROOM_CREATED,
  ROOM_UPDATED,
  ROOM_ERROR,
  GOT_ROOM_LIST,
  GOT_ROOM,
  LOGOUT_SUCCESS,
  USER_CONNECTED,
  USER_DISCONNECTED,
  CONNECTED_STRANGER_NUMBER_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    name: "",
    slug: "",
    contributors_number: null,
    id: null,
    errors: {},
    owner_name: "",
    transition_speed: 10,
    user_id: null,
    is_owner: true,
    connectedUsers: [],
    connected_stranger_number: 0,
    ownerRoomList: [],
    contributorRoomList: []
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
     return { ...state, is_owner: false }
    case ROOM_CREATED:{
      const { name, slug, contributors_number, id, user_id, owner_name, transition_speed, musics, is_owner, connections, connected_stranger_number } = action.payload;
      return { ...state, name, slug, contributors_number, id, errors: {}, owner_name, transition_speed, user_id, musics, is_owner, connectedUsers: connections, connected_stranger_number: connected_stranger_number }
    }
    case ROOM_UPDATED:{
      const { name, slug, contributors_number, id, user_id, owner_name, transition_speed, is_owner, connections, connected_stranger_number } = action.payload;
      return { ...state, name, slug, contributors_number, id, errors: {}, owner_name, transition_speed, user_id, is_owner, connectedUsers: connections, connected_stranger_number: connected_stranger_number }
    }
    case GOT_ROOM_LIST:{
      console.log("action.payload", action.payload)
      const { owner_rooms, contributor_rooms } = action.payload;
      return { ...state, ownerRoomList: owner_rooms, contributorRoomList: contributor_rooms }
    }
    case GOT_ROOM:{
      const { name, slug, contributors_number, id, user_id, owner_name, transition_speed, is_owner, connections, connected_stranger_number } = action.payload;
      return { ...state, name, slug, contributors_number, id, errors: {}, owner_name, transition_speed, user_id, is_owner, connectedUsers: connections, connected_stranger_number: connected_stranger_number }
    }
    case USER_CONNECTED:{
      if(_.includes(state.connectedUsers, action.payload)){
        return state
      }
      return { ...state, connectedUsers: [ ...state.connectedUsers, action.payload ] }
    }
    case USER_DISCONNECTED:{
      const connectedUsers = state.connectedUsers;
      _.remove(connectedUsers, (u) => { u === action.payload});
      return { ...state, connectedUsers }
    }
    case CONNECTED_STRANGER_NUMBER_CHANGED:{
      const connectedUsers = state.connectedUsers;
      return { ...state, connected_stranger_number: action.payload }
    }
    case ROOM_ERROR:{
      return { ...state, errors: action.payload }
    }
    default:
      return state;
  }
}
