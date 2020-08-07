import {
  SAVE_GUESS,
  COMPLETED_TRIAL,
  SAVE_TREE_CHOICE,
  ADVANCE_PHASE,
  SUCCESSFULLY_SAVED_CONCLUSION,
  SUCCESSFULLY_SAVED_AUDIO
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

  const saveDataResponse = await axios.put("/api/save-data", data);

  if (saveDataResponse.status === 200) {
    dispatch({
      type: ADVANCE_PHASE,
      nextPhase: "success"
    });
  } else {
    console.log("Unable to Save Data");
  }
};

export const saveConclusionAndAudio = conclusionAndAudio => async dispatch => {
  const audioData = conclusionAndAudio.audioData;

  // remove the audio data
  delete conclusionAndAudio.audioData;
  const conclusionResponses = conclusionAndAudio;

  const saveConclusionResponse = await axios.put(
    "/api/save-conclusion",
    conclusionResponses
  );
  if (saveConclusionResponse.status === 200) {
    dispatch({
      type: SUCCESSFULLY_SAVED_CONCLUSION
    });
  } else {
    console.log("Unable to save conclusion");
  }

  const saveAudioResponse = await axios.post("/api/save-audio", audioData);
  if (saveAudioResponse.status === 200) {
    console.log("Successfully saved audio");
  } else {
    console.log("Unable to save audio");
  }
};
