import Axios from "axios";
import { manageParameters } from "../../../../Parameters/Redux/manageParameters";

export const LOAD_TASKS_SUCCESS = "LOAD_TASKS_SUCCESS";
export const LOAD_TASKS_STARTED = "LOAD_TASKS_STARTED";
export const LOAD_TASKS_FAILURE = "LOAD_TASKS_FAILURE";

export const manageTasks = params => {
  let search = params.search || "";

  return dispatch => {
    dispatch(manageTasksStarted());

    Axios.get(
      "http://localhost:8080/api/taskExecution?&search=" +
        search +
        "&page=" +
        params.page +
        "&size=" +
        params.size
    )
      .then(res => {
        dispatch(
          manageParameters(
            "PARAMETERS_CHANGE_TOTAL_PAGES",
            res.headers["x-total-page"]
          )
        );
        return dispatch(manageTasksSuccess(res.data));
      })
      .catch(err => {
        dispatch(manageTasksFailure(err.message));
      });
  };
};

const manageTasksSuccess = tasks => ({
  type: LOAD_TASKS_SUCCESS,
  payload: {
    tasks
  }
});

const manageTasksStarted = () => ({
  type: LOAD_TASKS_STARTED
});

const manageTasksFailure = error => ({
  type: LOAD_TASKS_FAILURE,
  payload: {
    error
  }
});
