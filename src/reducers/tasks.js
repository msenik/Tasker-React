import { SET_VISIBLE_TASKS } from "../constants";

const initialState = [];

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBLE_TASKS:
      return action.tasks;

    default:
      return state;
  }
}
