import { combineReducers } from "redux";
import initializeReducer from "./initializeReducer";
import registerReducer from "./registerReducer";

export default combineReducers({
  initialize: initializeReducer,
  register: registerReducer
});
