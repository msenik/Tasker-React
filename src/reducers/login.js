import { LOGIN, LOGOUT } from "../constants";

const initialState = false;

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return true;

    case LOGOUT:
      return false;

    default:
      return state;
  }
}
