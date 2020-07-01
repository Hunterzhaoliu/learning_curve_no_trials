import { COMPLETED_TRIAL } from "./types";
// import axios from "axios";

export const completedTrial = () => dispatch => {
  dispatch({
    type: COMPLETED_TRIAL
  });
};
