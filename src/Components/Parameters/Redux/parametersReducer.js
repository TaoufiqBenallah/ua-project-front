import update from "immutability-helper";

export default function parametersReducer(
  state = { pages: 9, interval: 20, pageActive: 1, pageSize: 1 },
  action
) {
  switch (action.type) {
    case "PARAMETERS_CHANGE_PAGES":
      alert("Enrigistré");
      return update(state, { pages: { $set: action.payload } });
    case "PARAMETERS_CHANGE_INTERVAL":
      alert("Enrigistré");
      return update(state, { interval: { $set: action.payload } });
    case "PARAMETERS_CHANGE_ACTIVE_PAGE":
      return update(state, { pageActive: { $set: action.payload } });
    case "PARAMETERS_CHANGE_TOTAL_PAGES":
      return update(state, { pageSize: { $set: action.payload } });
    default:
      return state;
  }
}
