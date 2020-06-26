import { SAVE_WRONG_CODE_ERROR, NEXT_STEP, SAVE_CORRECT_CODE } from "./types";
// import history from "../components/history";

export const checkCode = userCode => async dispatch => {
  console.log("userCode = ", userCode);
  console.log("process.env = ", process.env);
  if (userCode === process.env.CODE) {
    dispatch({
      type: NEXT_STEP
    });

    dispatch({
      type: SAVE_CORRECT_CODE
    });
  } else {
    dispatch({
      type: SAVE_WRONG_CODE_ERROR
    });
  }
};

// export const register = newUser => async dispatch => {
//   const registerResponse = await axios.post("/api/register", newUser);
//
//   const registerResponseData = registerResponse.data;
//   if (registerResponseData !== "success") {
//     // user sign up has errors
//     dispatch({
//       type: SAVE_REGISTER_ERRORS,
//       registerErrors: registerResponseData
//     });
//   }
// };
