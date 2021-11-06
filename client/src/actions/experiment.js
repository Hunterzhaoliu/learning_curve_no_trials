import {
  SAVE_GUESS,
  COMPLETED_TRIAL,
  SAVE_TREE_CHOICE,
  ADVANCE_PHASE
} from "./types";
import axios from "axios";

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

export const completedTrial = trialLength => dispatch => {
  dispatch({
    type: COMPLETED_TRIAL,
    trialLength: trialLength
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

  const saveDataResponse = await axios.put("/api/save-data", data);

  if (saveDataResponse.status === 200) {
  } else {
    console.log("Unable to Save Data");
  }
};

export const saveAudio = audioFile => async dispatch => {
  if (audioFile !== "failed audio") {
    const saveAudioResponse = await axios.post("/api/save-audio", audioFile);
    if (saveAudioResponse.status === 200) {
      console.log("Successfully saved audio");
    } else {
      console.log("Unable to save audio");
    }
  } else {
    console.log("Unable to save audio");
  }
};

export const saveInitialConclusion = initialConclusionData => async dispatch => {
  const saveInitialConclusionResponse = await axios.put(
    "/api/save-initial-conclusion",
    initialConclusionData
  );
  if (saveInitialConclusionResponse.status === 200) {
    console.log("Successfully saved initial conclusion");
  } else {
    console.log("Unable to save initial conclusion");
  }
};

export const saveFinalConclusion = finalConclusionData => async dispatch => {
  const saveFinalConclusionResponse = await axios.put(
    "/api/save-final-conclusion",
    finalConclusionData
  );
  if (saveFinalConclusionResponse.status === 200) {
    console.log("Successfully saved final conclusion");
  } else {
    console.log("Unable to save finalconclusion");
  }
};
