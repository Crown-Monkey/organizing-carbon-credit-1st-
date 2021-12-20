import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";
import blockReducer from "./blockchain";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    blockchain: blockReducer
    
});

export default rootReducer;