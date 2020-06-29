import { SAVE_CODE_ERROR, NEXT_STEP, REMOVE_CODE_ERROR } from "./types";
// import history from "../components/history";

export const checkCode = userCode => async dispatch => {
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

export const register = (signature, date) => async dispatch => {
  console.log("signature = ", signature);
  // const registerResponse = await axios.post("/api/register", subject);
  //
  // const registerResponseData = registerResponse.data;
  // if (registerResponseData !== "success") {
  //   // user sign up has errors
  //   dispatch({
  //     type: SAVE_REGISTER_ERRORS,
  //     registerErrors: registerResponseData
  //   });
  // }
};
