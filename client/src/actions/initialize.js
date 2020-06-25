import axios from "axios";
import { UPDATE_WINDOW_DIMENSIONS, SAVE_REGISTER_ERRORS } from "./types";
// import history from "../components/history";

export const initializeApp = () => async dispatch => {
  // const userResponse = await axios.get(
  //   "/api/user?mongoDBUserId=" + mongoDBUserId
  // );
  //
  // const userAccess = userResponse.data.access;
  //
  // dispatch({
  //   type: SET_CURRENT_USER,
  //   mongoDBUserId: userResponse.data._id,
  //   access: userAccess,
  //   email: userResponse.data.email
  // });
};

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

export const updateWindowDimensions = (
  newWindowWidth,
  newWindowHeight
) => dispatch => {
  dispatch({
    type: UPDATE_WINDOW_DIMENSIONS,
    newWindowWidth: newWindowWidth,
    newWindowHeight: newWindowHeight
  });
};
