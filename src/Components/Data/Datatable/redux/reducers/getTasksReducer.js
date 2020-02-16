import {
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAILURE,
  LOAD_TASKS_STARTED
} from "../actions/manageTasks";

const initialState = {
  loading: false,
  tasks: [],
  error: null
};

export default function getTasksReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TASKS_STARTED:
      return {
        ...state,
        loading: true
      };
    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tasks: action.payload.tasks
      };
    case LOAD_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
