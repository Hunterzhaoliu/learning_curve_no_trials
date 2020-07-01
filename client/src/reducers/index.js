import { combineReducers } from "redux";
import initializeReducer from "./initializeReducer";
import registerReducer from "./registerReducer";
import experimentReducer from "./experimentReducer";

export default combineReducers({
  initialize: initializeReducer,
  register: registerReducer,
  experiment: experimentReducer
});
