import { combineReducers } from "redux";
import login from "./login";
import tasks from "./tasks";
import totalTasksCount from "./totalTasksCount";
import tastsVisibleParams from "./tastsVisibleParams";
import saveTaskError from "./saveTaskError";

const rootReducer = combineReducers({
  login,
  tasks,
  totalTasksCount,
  tastsVisibleParams,
  saveTaskError
});
export default rootReducer;
