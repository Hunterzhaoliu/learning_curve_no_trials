import {
  SUBMIT_CODE_ERROR,
  REMOVE_CODE_ERROR,
  NEXT_STEP,
  SUCCESSFULLY_SUBMITTED_CODE
} from "../actions/types";

let cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

let initialState = {
  step: 1,
  codeError: false,
  dBID: null,
  condition: ""
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case SUBMIT_CODE_ERROR:
      newState.codeError = true;
      return newState;
    case REMOVE_CODE_ERROR:
      newState.codeError = false;
      return newState;
    case NEXT_STEP:
      newState.step += 1;
      return newState;
    case SUCCESSFULLY_SUBMITTED_CODE:
      newState.dBID = action.subjectDBInfo.dBID;
      newState.condition = action.subjectDBInfo.condition;
      return newState;
    default:
      return state;
  }
}
