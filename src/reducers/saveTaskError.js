import {
  SET_SAVE_TASK_ERROR_FLAG,
  UNSET_SAVE_TASK_ERROR_FLAG
} from "../constants";

const initialState = "";

export default function saveTaskError(state = initialState, action) {
  switch (action.type) {
    case SET_SAVE_TASK_ERROR_FLAG:
      return action.msg;

    case UNSET_SAVE_TASK_ERROR_FLAG:
      return "";

    default:
      return state;
  }
}
