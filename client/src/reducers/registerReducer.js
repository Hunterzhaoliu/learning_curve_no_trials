import { SAVE_REGISTER_ERRORS } from "../actions/types";

let cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

let initialState = {
  registerErrors: {}
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case SAVE_REGISTER_ERRORS:
      newState.registerErrors = action.registerErrors;
      return newState;
    default:
      return state;
  }
}
