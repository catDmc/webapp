import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";
import reducer from "../reduce/reduce";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push();
}

const store = createStore(reducer, applyMiddleware(...middleware));
export default store;
