import {
  SUCCESSFULLY_SUBMITTED_CODE,
  SUBMIT_CODE_ERROR,
  NEXT_STEP,
  REMOVE_CODE_ERROR
} from "./types";
import axios from "axios";
// import { isValidFilledString } from "../utils/ValidateRegistration";

export const startExperiment = () => dispatch => {
  dispatch({
    type: NEXT_STEP
  });
};

export const submitCode = (code, childBirthDate) => async dispatch => {
  if (code === "error") {
    dispatch({
      type: SUBMIT_CODE_ERROR
    });
  } else {
    // valid code
    const submitCodeResponse = await axios.post("/api/submit-code", {
      code: code,
      childBirthDate: childBirthDate
    });

    if (submitCodeResponse.status === 200) {
      dispatch({
        type: SUCCESSFULLY_SUBMITTED_CODE,
        subjectDBInfo: submitCodeResponse.data
      });

      dispatch({
        type: REMOVE_CODE_ERROR
      });

      dispatch({
        type: NEXT_STEP
      });
    } else {
      dispatch({ type: SUBMIT_CODE_ERROR });
    }
  }
};
