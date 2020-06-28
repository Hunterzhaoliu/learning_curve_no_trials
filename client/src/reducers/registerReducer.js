import { SAVE_CODE_ERROR, REMOVE_CODE_ERROR } from "../actions/types";

let cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

let initialState = {
  codeError: false,
  registerErrors: {}
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case SAVE_CODE_ERROR:
      newState.codeError = true;
      return newState;
    case REMOVE_CODE_ERROR:
      newState.codeError = false;
      return newState;
    default:
      return state;
  }
}
