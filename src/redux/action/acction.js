// Action này trả về một plain Javascript object
// action cần trả về một function
// action này được gọi là Async Action,async dispatch

// Ta viết lại Action ở trên, thay vì return, ta sử dụng hàm dispatch
//  CẤU TRÚC dispatchEvent()
import * as PathAction from "./../PathAction";
/// gọi axios
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
// import axios from "axios";

// hàm này được gọi là hàm khởi tạo để dùng chung nè
//type là kiểu dữ liệu truyền vào
//payload giá trị tham số mà action creator truyền lên.
export const createAction = ({ type, payload }) => {
  return { type, payload };
};
//B2: ở đây tao tạo một hàm gọi ( around function) để call API

export const callAPIgetListFood = () => {
  return async (dispatch) => {
    try {
      //res (resonse) ở đây theo tao biết là nhận vào data mà api đã gọi
      //khi call nó sẽ trả về môt res chứa các thông
      // muốn biết thì xuống dưới consle.log(res) ra xem nó trả về cái gì
      /// API là path của API dùng để gọi nó lên 'GET' là phương thức
      // hay trong anh văn gọi là 'mê thót (methods)' đó
      const res = await API("GET", URL_API + "/foods", null, null);
      // hàm dispatch hiểu nôm na là lưu store type và các value gắn cùng
      // gg search đi
      dispatch(
        //dây quay lại nhìn ở trên đó tao có type với payload kìa
        //lưu tham số và data truyền vào để bắn lên store(userReducer)
        createAction({
          type: PathAction.GET_LIST_FOOD,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

//------------------  ------------------------------  ----------------------

export const callAPIGetListPackage = () => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/packages", null, null);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_PACKAGE_FOOD,
          payload: res.data.result,
        })
      );
      // console.log(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
};

//----------------------------------------------
export const callAPIgetListCategory = () => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/food-categories");
      dispatch(
        createAction({
          type: PathAction.GET_LIST_FOODCATEGORY,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

//----------------------------------------------------------------
// export default callAPIgetListFood = () =>{
// return async((dispatch) =>{
//       try {
//         const res = await API('GET',URL_API + "/foods/")
//       } catch (error) {

//       }
// }

//-------------------------------------------
export const callAPIStation = () => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/stations", null, null);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_STATIONS,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

//----------------------------------------------------------------

export const callAPIgetGroupFood = (req, res) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/food-groups");
      dispatch(
        createAction({
          type: PathAction.GET_LIST_GROUP_FOOD,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
//---------------------------------------------------------------
export const callAPIgetTimeFrame = (req, res) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/time-frame");
      dispatch(
        createAction({
          type: PathAction.GET_LIST_TIME_FRAME,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
//---------------------------------------------------
export const callAPIgetPackagebyID   = (req, res) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/time-frame");
      dispatch(
        createAction({
          type: PathAction.GET_LIST_TIME_FRAME,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
