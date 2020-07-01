import {
  SAVE_CODE_ERROR,
  REMOVE_CODE_ERROR,
  SUCCESSFULLY_REGISTERED_CONSENT,
  SAVE_REGISTER_CONSENT_ERRORS
} from "../actions/types";

let cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

let initialState = {
  codeError: false,
  consentError: {
    childName: false,
    childBirthDate: false,
    signature: false,
    videoPermission: false
  },
  questionnaireErrors: {},
  dBID: null,
  condition: 2
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
    case SAVE_REGISTER_CONSENT_ERRORS:
      newState.consentError.signature = action.errors.signature;
      return newState;
    case SUCCESSFULLY_REGISTERED_CONSENT:
      newState.dBID = action.subjectDBInfo.dBID;
      newState.condition = action.subjectDBInfo.condition;
      return newState;
    default:
      return state;
  }
}
