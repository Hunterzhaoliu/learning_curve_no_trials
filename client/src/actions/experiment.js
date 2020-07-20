import {
  SAVE_GUESS,
  COMPLETED_TRIAL,
  SAVE_TREE_CHOICE,
  ADVANCE_PHASE
} from "./types";
// import axios from "axios";

export const advancePhase = nextPhase => dispatch => {
  dispatch({
    type: ADVANCE_PHASE,
    nextPhase: nextPhase
  });
};
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

export const saveTreeChoice = treeChoice => dispatch => {
  dispatch({
    type: SAVE_TREE_CHOICE,
    treeChoice: treeChoice
  });
};
