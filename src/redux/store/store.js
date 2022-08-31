import { combineReducers } from "redux";
import userReducer from "../reducer/userReducer";

 const rootReducer = combineReducers({
     user: userReducer,
 });

 export default rootReducer;