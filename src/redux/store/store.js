import { combineReducers } from "redux";
import userReducer from "../reducer/userReducer";

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;

// store dùng để làm gì ?
//root tổng import tất cả sì to dô để nó cờm bai và nó chạy
