import {
  SAVE_GUESS,
  COMPLETED_TRIAL,
  SAVE_TREE_CHOICE,
  ADVANCE_PHASE,
  SAVE_INTERFERENCE_ANSWER
} from "./types";

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

export const saveData = data => async dispatch => {
  dispatch({
    type: SAVE_TREE_CHOICE,
    treeChoice: data.treeChoice
  });

  dispatch({
    type: ADVANCE_PHASE,
    nextPhase: "success"
  });

  // const saveDataResponse = await axios.put("/api/save-data", data);
  //
  // if (saveDataResponse.status === 200) {
  //   dispatch({
  //     type: ADVANCE_PHASE,
  //     nextPhase: "success"
  //   });
  // } else {
  //   console.log("Unable to Save Data");
  // }
};

export const saveInterferenceAnswer = (
  dBID,
  interferenceAnswer
) => async dispatch => {
  dispatch({
    type: SAVE_INTERFERENCE_ANSWER,
    interferenceAnswer: interferenceAnswer
  });

  // const interferenceData = {
  //   dBID: dBID,
  //   interferenceAnswer: interferenceAnswer
  // };

  // const saveInterferenceResponse = await axios.put(
  //   "/api/save-interference",
  //   interferenceData
  // );
  // if (saveInterferenceResponse.status === 200) {
  //   dispatch({
  //     type: SAVE_INTERFERENCE_ANSWER,
  //     interferenceAnswer: interferenceAnswer
  //   });
  // } else {
  //   console.log("Unable to Save Data");
  // }
};
