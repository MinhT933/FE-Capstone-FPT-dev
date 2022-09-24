//reduce dùng để làm gì
// Use the initialState as a default value
//initialState là 1 trạng thái ban đầu với chứa các chuổi rỗng
// ---------------------------------------------------------------- ------
// const initialState = {
//   user: {},
//   listUser: []
// }

// lưu trạng thái hiện tại và thực hiện một hành động để trả về một trạng thái mới
// for example:
//--------------------------------------------------------------------
// export default function userReducer(state = initialState, action) {
//   console.log(action);
//   switch (action.type) {
//     case Action.GET_LIST_USER:
//       state.listUser = action.payload; === > state bang đầu là rỗng  sau khi người dùng (coder) gọi api ACTION: GET_LIST_USER
// thay thế một trạng mới bằng payload
//       return {...state}

import * as PathAction from "../PathAction";

//nhận 2 tham số State và action
//dây là store
const initialState = {
  food: [],
  listFood: [],
};
export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case PathAction.GET_LIST_FOOD:
      state.listFood = payload;
      console.log(payload);
      //lưu data
      break;
    default:
      return state;
  }
  return { ...state };
}
