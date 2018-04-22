import { take, takeEvery, put, select, call } from "redux-saga/effects";
import {
  setVisibleTasks,
  setTotalTasksCount,
  setSaveTaskErrorFlag,
  unsetSaveTaskErrorFlag
} from "../ac";
import strictUriEncode from "strict-uri-encode";
import md5 from "md5";
import readAndCompressImage from "browser-image-resizer";
import {
  SORT_PARAMS_CHANGE,
  CURRENT_PAGE_CHANGE,
  EDIT_TASK,
  SAVE_TASK
} from "../constants";

async function uploadImage(task) {
  const config = {
    quality: 1,
    width: 320,
    height: 240
  };

  try {
    let resizedImage;
    if (task.img) {
      resizedImage = await readAndCompressImage(task.img, config);
    } else {
      resizedImage = null;
    }

    const url = `https://uxcandy.com/~shapoval/test-task-backend/create/?developer=msenik`;
    const formData = new FormData();
    formData.append("username", task.username);
    formData.append("email", task.email);
    formData.append("text", task.text);
    formData.append("image", resizedImage);
    const options = {
      method: "POST",
      body: formData
    };

    let result = await fetch(url, options);
    let json = await result.json();
    return json;
  } catch (error) {
    // throw error;
  }
}

function* getTasks() {
  const sortParams = [
    "&sort_field=username&sort_direction=asc",
    "&sort_field=username&sort_direction=desc",
    "&sort_field=email&sort_direction=asc",
    "&sort_field=email&sort_direction=desc",
    "&sort_field=status&sort_direction=asc",
    "&sort_field=status&sort_direction=desc"
  ];
  const sort = yield select(state => state.tastsVisibleParams.sort);
  const page = yield select(state => state.tastsVisibleParams.page);
  const url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=msenik${sortParams[sort]}&page=${page}`;
  const data = yield call(fetch, url);
  const obj = yield data.json();
  if (obj.status === "ok") {
    const tasks = obj.message.tasks;
    yield put(setVisibleTasks(tasks));
    yield put(setTotalTasksCount(obj.message.total_task_count));
  }
}

function* editTask(action) {
  const { id, status, text } = action.task;
  const token = "beejee";
  const params = [
    ["id", id],
    ["status", status],
    ["text", text],
    ["token", token]
  ];
  let queryParams = [];
  for (let param of params) {
    queryParams.push(
      `${strictUriEncode(param[0])}=${strictUriEncode(param[1])}`
    );
  }
  let queryString = queryParams.join("&");
  queryString += `&signature=${md5(queryString)}`;
  const url = `https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?developer=msenik`;
  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });

  const init = {
    method: "POST",
    headers,
    body: queryString
  };
  const request = yield call(fetch, url, init);
  const result = yield request.json();
  if (result.status === "ok") {
    yield getTasks();
  }
}

function* saveTask(action) {
  const task = action.task;
  const result = yield call(uploadImage, task);
  console.log(result);
  if (result.status === "error") {
    yield put(setSaveTaskErrorFlag(Object.keys(result.message).join()));
  } else {
    yield put(unsetSaveTaskErrorFlag());
    yield getTasks();
  }
}

export default function* apiSaga() {
  yield getTasks();
  yield takeEvery([SORT_PARAMS_CHANGE, CURRENT_PAGE_CHANGE], getTasks);
  yield takeEvery(EDIT_TASK, editTask);
  yield takeEvery(SAVE_TASK, saveTask);
}
