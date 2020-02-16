import update from "immutability-helper";

export default function taskDetailsReducer(
  state = { item: {}, active: false },
  action
) {
  switch (action.type) {
    case "DETAILS_ACTIVE":
      return update(state, {
        item: { $set: action.payload },
        active: { $set: true }
      });
    case "DETAILS_INACTIVE":
      return update(state, { item: {}, active: { $set: false } });
    default:
      return state;
  }
}
