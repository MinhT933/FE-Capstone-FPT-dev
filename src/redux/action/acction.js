// Action này trả về một plain Javascript object
// action cần trả về một function
// action này được gọi là Async Action,async dispatch

// Ta viết lại Action ở trên, thay vì return, ta sử dụng hàm dispatch
//  CẤU TRÚC dispatchEvent()
import * as PathAction from "./../PathAction";
/// gọi axios
import API from "../../Axios/API/API";
// import axios from "axios";

export const createAction = ({ type, payload }) => {
  return { type, payload };
};

export const callAPIgetListFood = () => {
  return async (dispatch) => {
    try {
      const res = await API("GET", "http://localhost:3001/foods", null, null);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_FOOD,
          payload: res.data.result,
        })
      );
      // console.log(res.data.result);
    } catch (err) {
      console.log({ err });
    }
  };
};
