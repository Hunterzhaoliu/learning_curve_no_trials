import { SAVE_WRONG_CODE_ERROR, SAVE_CORRECT_CODE } from "../actions/types";

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
    case SAVE_WRONG_CODE_ERROR:
      newState.codeError = true;
      return newState;
    case SAVE_CORRECT_CODE:
      newState.codeError = false;
      return newState;
    default:
      return state;
  }
}
