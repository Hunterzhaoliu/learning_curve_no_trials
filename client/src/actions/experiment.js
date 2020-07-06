import { SAVE_GUESS, COMPLETED_TRIAL } from "./types";
// import axios from "axios";

export const saveGuess = guessHeight => dispatch => {
  dispatch({
    type: SAVE_GUESS,
    guessHeight: guessHeight
  });
};

export const completedTrial = () => dispatch => {
  dispatch({
    type: COMPLETED_TRIAL
  });
};
