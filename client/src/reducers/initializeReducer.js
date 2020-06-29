import { UPDATE_WINDOW_DIMENSIONS, NEXT_STEP } from "../actions/types";

let cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

let initialState = {
  step: 1,
  windowWidth: null,
  windowHeight: null
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case UPDATE_WINDOW_DIMENSIONS:
      newState.windowWidth = action.newWindowWidth;
      newState.windowHeight = action.newWindowHeight;
      return newState;
    case NEXT_STEP:
      newState.step = 1;
      return newState;
    default:
      return state;
  }
}
