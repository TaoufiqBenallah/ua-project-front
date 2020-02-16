import update from "immutability-helper";

export default function refreshBannerReducer(state = false, action) {
  switch (action.type) {
    case "REFRESH_ACTIVE":
      return update(state, { $set: true });
    case "REFRESH_INACTIVE":
      return update(state, { $set: false });
    default:
      return state;
  }
}
