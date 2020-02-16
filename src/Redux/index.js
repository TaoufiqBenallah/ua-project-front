import { combineReducers } from "redux";
import parametersReducer from "../Components/Parameters/Redux/parametersReducer";
import getTasksReducer from "../Components/Data/Datatable/redux/reducers/getTasksReducer";
import refreshBannerReducer from "../Components/Refreshed/redux/refreshBannerReducer";
import taskDetailsReducer from "../Components/Data/Datatable/DetailsOfRow/redux/taskDetailsReducer";

const rootReducer = combineReducers({
  parameters: parametersReducer,
  tasks: getTasksReducer,
  refreshBannerStatus: refreshBannerReducer,
  taskDetails: taskDetailsReducer
});

export default rootReducer;
