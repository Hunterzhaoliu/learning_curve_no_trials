import {
  SAVE_GUESS,
  COMPLETED_TRIAL,
  SAVE_TREE_CHOICE,
  ADVANCE_PHASE
} from "../actions/types";

let cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

let initialState = {
  phase: "summary",
  trial: 5,
  guesses: [20, 30, 40, 50],
  treeChoice: ""
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case ADVANCE_PHASE:
      newState.phase = action.nextPhase;
      return newState;
    case SAVE_GUESS:
      newState.guesses.push(action.guessHeight);
      return newState;
    case COMPLETED_TRIAL:
      newState.trial++;
      return newState;
    case SAVE_TREE_CHOICE:
      newState.treeChoice = action.treeChoice;
      return newState;
    default:
      return state;
  }
}
