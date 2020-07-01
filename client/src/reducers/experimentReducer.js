import { COMPLETED_TRIAL } from "../actions/types";

let cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

let initialState = {
  trial: 0
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case COMPLETED_TRIAL:
      newState.trial++;
      return newState;
    default:
      return state;
  }
}
