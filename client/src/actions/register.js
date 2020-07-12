import {
  SAVE_CODE_ERROR,
  NEXT_STEP,
  REMOVE_CODE_ERROR,
  SUCCESSFULLY_REGISTERED_CONSENT,
  SAVE_REGISTER_CONSENT_ERRORS
} from "./types";
import axios from "axios";
import { isValidFilledString } from "../utils/ValidateRegistration";
// import history from "../components/history";

export const startExperiment = () => dispatch => {
  dispatch({
    type: NEXT_STEP
  });
};

export const checkCode = userCode => dispatch => {
  if (userCode === process.env.REACT_APP_CODE) {
    dispatch({
      type: NEXT_STEP
    });

    dispatch({
      type: REMOVE_CODE_ERROR
    });
  } else {
    dispatch({
      type: SAVE_CODE_ERROR
    });
  }
};

export const registerConsent = registerInfo => async dispatch => {
  // TODO: validate registration information
  let errors = {};
  // fill errors
  errors.signature = !isValidFilledString(registerInfo.signature);

  dispatch({
    type: SAVE_REGISTER_CONSENT_ERRORS,
    errors: errors
  });

  if (errors.signature) {
    // there is an error in registration, don't register subject for agent
  } else {
    // errors shouldn't be part of the registration
    delete registerInfo.errors;
    const registerConsentResponse = await axios.post(
      "/api/register-consent",
      registerInfo
    );

    if (registerConsentResponse.status === 200) {
      dispatch({
        type: SUCCESSFULLY_REGISTERED_CONSENT,
        subjectDBInfo: registerConsentResponse.data
      });

      dispatch({
        type: NEXT_STEP
      });
    } else {
      dispatch({ type: SAVE_REGISTER_CONSENT_ERRORS });
    }
  }
};
