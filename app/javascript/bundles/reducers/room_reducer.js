import {
  ROOM_CREATED,
  ROOM_ERROR,
  GOT_ROOM_LIST,
  GOT_ROOM
} from '../actions/types';

const INITIAL_STATE = {
    name: "",
    slug: "",
    contributors_number: null,
    id: null,
    errors: {},
    owner: "",
    user_id: null,
    ownerRoomList: [],
    contributorRoomList: [],
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ROOM_CREATED:{
      const { name, slug, contributors_number, id, user_id, owner_name} = action.payload;
      return { ...state, name, slug, contributors_number, id, errors: {}, owner_name, user_id }
    }
    case GOT_ROOM_LIST:{
      const { owner_rooms, contributor_rooms } = action.payload;
      return { ...state, ownerRoomList: owner_rooms, contributorRoomList: contributor_rooms }
    }
    case GOT_ROOM:{
      const { name, slug, contributors_number, id, user_id, owner_name} = action.payload;
      return { ...state, name, slug, contributors_number, id, errors: {}, owner_name, user_id }
    }
    case ROOM_ERROR:{
      return { ...state, errors: action.payload }
    }
    default:
      return state;
  }
}
