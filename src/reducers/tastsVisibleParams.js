import { SORT_PARAMS_CHANGE, CURRENT_PAGE_CHANGE } from "../constants";

const initialState = { sort: 0, page: 1 };

export default function tastsVisibleParams(state = initialState, action) {
  switch (action.type) {
    case SORT_PARAMS_CHANGE:
      return { ...state, sort: action.value };

    case CURRENT_PAGE_CHANGE:
      return { ...state, page: action.value };

    default:
      return state;
  }
}
