import userReducer from "./user";
import authReducer from "./auth";
import blockReducer from "./blockchain";
import { combineReducers } from "redux";



const rootReducer = combineReducers({
    
    user: userReducer,
    auth: authReducer,
    blockchain: blockReducer
    
});

export default rootReducer;