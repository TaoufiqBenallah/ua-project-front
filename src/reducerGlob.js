export default function reducerGlobReducer(state, action) {
  switch (action.type) {
    case "hf":
      return [];
    default:
      return "Taoufiq App";
  }
}
