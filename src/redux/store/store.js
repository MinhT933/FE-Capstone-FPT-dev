import { combineReducers } from "redux";
import userReducer from "../reducer/userReducer";
import AuthReducer from "./../reducer/authReducer";
import MessageReducer from "./../reducer/messageReducer";

const rootReducer = combineReducers({
  userReducer,
  AuthReducer,
  MessageReducer,
});

export default rootReducer;

// store dùng để làm gì ?
//root tổng import tất cả sì to dô để nó cờm bai và nó chạy
