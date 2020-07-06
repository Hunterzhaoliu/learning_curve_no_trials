import { SAVE_GUESS, COMPLETED_TRIAL } from "../actions/types";

let cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

let initialState = {
  trial: 1,
  guesses: []
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
    default:
      return state;
  }
}
