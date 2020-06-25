import { SAVE_REGISTER_ERRORS } from "./types";
// import history from "../components/history";

export const register = newUser => async dispatch => {
  const registerResponse = await axios.post("/api/register", newUser);

  const registerResponseData = registerResponse.data;
  if (registerResponseData !== "success") {
    // user sign up has errors
    dispatch({
      type: SAVE_REGISTER_ERRORS,
      registerErrors: registerResponseData
    });
  }
};
