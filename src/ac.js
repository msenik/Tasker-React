import {
  LOGIN,
  LOGOUT,
  SET_VISIBLE_TASKS,
  SET_TOTAL_TASKS_COUNT,
  SORT_PARAMS_CHANGE,
  CURRENT_PAGE_CHANGE,
  EDIT_TASK,
  SAVE_TASK,
  SET_SAVE_TASK_ERROR_FLAG,
  UNSET_SAVE_TASK_ERROR_FLAG
} from "./constants";

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });
export const setVisibleTasks = tasks => ({ type: SET_VISIBLE_TASKS, tasks });
export const setTotalTasksCount = count => ({
  type: SET_TOTAL_TASKS_COUNT,
  count
});
export const sortParamsChange = value => ({ type: SORT_PARAMS_CHANGE, value });
export const currentPageChange = value => ({
  type: CURRENT_PAGE_CHANGE,
  value
});
export const editTask = task => ({ type: EDIT_TASK, task });
export const saveTask = task => ({ type: SAVE_TASK, task });
export const setSaveTaskErrorFlag = msg => {
  console.log(msg);
  return { type: SET_SAVE_TASK_ERROR_FLAG, msg };
};
export const unsetSaveTaskErrorFlag = () => ({
  type: UNSET_SAVE_TASK_ERROR_FLAG
});
