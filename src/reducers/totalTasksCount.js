import { SET_TOTAL_TASKS_COUNT } from "../constants";

const initialState = 0;

export default function totalTasksCount(state = initialState, action) {
  switch (action.type) {
    case SET_TOTAL_TASKS_COUNT:
      return action.count;

    default:
      return state;
  }
}
