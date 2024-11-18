import { combineReducers } from "redux";

import authReducer from "./auth.js";
import postReducer from "./post.js";

const reducers = combineReducers({
    authReducer,
    postReducer
});

export default reducers;