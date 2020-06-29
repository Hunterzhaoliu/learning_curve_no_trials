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
  questionnaireErrors: {}
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
    default:
      return state;
  }
}
