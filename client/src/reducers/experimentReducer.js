import {
  SAVE_GUESS,
  COMPLETED_TRIAL,
  SAVE_TREE_CHOICE
} from "../actions/types";

let cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

let initialState = {
  trial: 0,
  guesses: [],
  treeChoice: ""
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
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
