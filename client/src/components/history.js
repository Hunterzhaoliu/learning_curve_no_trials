// file is to be able to use history.push in action files
// https://github.com/ReactTraining/react-router/issues/3498

// Warning: require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")
import { createBrowserHistory } from "history";
export default createBrowserHistory();
