import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import experimentReducer from "./experimentReducer";

export default combineReducers({
  register: registerReducer,
  experiment: experimentReducer
});
