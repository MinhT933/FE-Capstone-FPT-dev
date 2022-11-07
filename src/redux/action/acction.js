// Action này trả về một plain Javascript object
// action cần trả về một function
// action này được gọi là Async Action,async dispatch

// Ta viết lại Action ở trên, thay vì return, ta sử dụng hàm dispatch
//  CẤU TRÚC dispatchEvent()
import * as PathAction from "./../PathAction";
/// gọi axios
import API from "../../Axios/API/API";
import { URL_API } from "../../Axios/URL_API/URL";
import { CustomizedToast } from "../../components/Toast/ToastCustom";
import jwt_decode from "jwt-decode";

// hàm này được gọi callAPIgetFoodbyGroupFoodId hàm khởi tạo để dùng chung nè

//type là kiểu dữ liệu truyền vào
//payload giá trị tham số mà action creator truyền lên.
export const createAction = ({ type, payload }) => {
  return { type, payload };
};
//B2: ở đây tao tạo một hàm gọi ( around function) để call API

export const callAPIgetListFood = (token) => {
  return async (dispatch) => {
    try {
      //res (resonse) ở đây theo tao biết là nhận vào data mà api đã gọi
      //khi call nó sẽ trả về môt res chứa các thông
      // muốn biết thì xuống dưới consle.log(res) ra xem nó trả về cái gì
      /// API là path của API dùng để gọi nó lên 'GET' là phương thức
      // hay trong anh văn gọi là 'mê thót (methods)' đó
      const res = await API("GET", URL_API + "/foods", null, token);
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

export const callAPIgetListFoodByStatus = (token, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/foods/byStatus?statusFood=${status}`,
        null,
        token
      );

      dispatch(
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

export const callAPIgetListFoodActive = (token) => {
  return async (dispatch) => {
    try {
      //res (resonse) ở đây theo tao biết là nhận vào data mà api đã gọi
      //khi call nó sẽ trả về môt res chứa các thông
      // muốn biết thì xuống dưới consle.log(res) ra xem nó trả về cái gì
      /// API là path của API dùng để gọi nó lên 'GET' là phương thức
      // hay trong anh văn gọi là 'mê thót (methods)' đó
      const res = await API("GET", URL_API + "/foods/active", null, token);
      // hàm dispatch hiểu nôm na là lưu store type và các value gắn cùng
      // gg search đi
      dispatch(
        //dây quay lại nhìn ở trên đó tao có type với payload kìa
        //lưu tham số và data truyền vào để bắn lên store(userReducer)
        createAction({
          type: PathAction.GET_LIST_FOOD_ACTIVE,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

//------------------  ------------------------------  ----------------------

export const callAPIGetListPackage = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/packages", null, token);
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

export const callAPIGetListPack = async (token, status) => {
  return async (dispatch) => {
    try {
      console.log("jhjahah");
      const res = await API(
        "GET",
        URL_API + `/packages/byStatus?statusPackage=${status}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_PACKAGE_FOOD,
          payload: res.data.result,
        })
      );
      // console.log(res.data.result);
    } catch (err) {
      console.log(err);
      // console.log("hehehe");
    }
  };
};

//----------------------------------------------------------------
export const callAPIgetListCategory = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/food-categories", null, token);
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

export const callAPIgetListStation = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/stations", null, token);
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

export const callAPIgetShipperByID = (token, id) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/shippers/${id}`, null, token);
      dispatch(
        createAction({
          type: PathAction.GET_SHIPPER_BY_ID,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

//----------------------------------------------------------------
export const callAPIgetGroupFood = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/food-groups", null, token);
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

export const callAPIgetGroupFoodByStatus = (token, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/food-groups/byStatus?statusFG=${status}`,
        null,
        token
      );
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

export const callAPIProfile = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/accounts/me", null, token);
      dispatch(
        createAction({
          type: PathAction.GET_PROFILE,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

export const callAPIgetFoodbyGroupFoodId = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/food-groups/find/${id}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_FOOD_BY_FOODGROUP_ID,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
//---------------------------------------------------------------
export const callAPIgetTimeFrame = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/time-frame", null, token);
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
export const callAPIgetShipperOfKitchen = (token, id) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/kitchens/shipper/${id}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_SHIPPER_OF_KITCHEN,
          payload: res.data.result.shippers,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
export const callAPIgetCatePackage = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + "/package-categories",
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_CATE_PACKAGE,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

export const callAPIgetTimeFramebyID = (id) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/time-frame/${id}`, null, null);
      console.log(res);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_TIME_FRAME_BY_ID,
          payload: res.data.result.dateFilter,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

export const LoginAthenAdmin = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + `/auths/login/admin`, user);
      localStorage.setItem("token", res.data.result.access_token);
      dispatch(
        createAction({
          type: PathAction.LOGIN_USER,
          payload: res.data.result,
        })
      );
      navigate("/dashboard/admin");
    } catch (error) {
      CustomizedToast({
        message: "Tên đăng nhập hoặc mật khẩu sai",
        type: "ERROR",
      });
    }
  };
};

export const LoginAthen = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + `/auths/login`, user);
      localStorage.setItem("token", res.data.result.access_token);
      const detoken = jwt_decode(res.data.result.access_token);
      dispatch(
        createAction({
          type: PathAction.LOGIN_USER,
          payload: res.data.result,
        })
      );
      if (detoken.role === "admin") {
        navigate("/dashboard/admin/app");
      } else if (detoken.role === "manager") {
        navigate("/dashboard/manager/food");
      } else if (detoken.role === "kitchen") {
        navigate("/dashboard/kitchen/kitchenorder");
      }
    } catch (error) {
      CustomizedToast({
        message: "Tên đăng nhập hoặc mật khẩu sai",
        type: "ERROR",
      });
    }
  };
};
//----------------------------------------------------------------
export const LoginAthenManager = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + "/auths/login/manager", user);
      // console.log(res.data.result);
      localStorage.setItem("token", res.data.result.access_token);
      dispatch(
        createAction({
          type: PathAction.LOGIN_USER,
          payload: res.data.result,
        })
      );
      navigate("/dashboard/manager/food");
    } catch (error) {
      CustomizedToast({
        message: "Tên đăng nhập hoặc mật khẩu sai",
        type: "ERROR",
      });
    }
  };
};
//----------------------------------------------------------------
export const LoginAthenKitchen = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + "/auths/login/kitchen", user);
      // console.log(res.data.result);
      localStorage.setItem("token", res.data.result.access_token);
      dispatch(
        createAction({
          type: PathAction.LOGIN_USER,
          payload: res.data.result,
        })
      );
      navigate("/dashboard/kitchen/Listkitchen");
    } catch (error) {
      CustomizedToast({
        message: "Tên đăng nhập hoặc mật khẩu sai",
        type: "ERROR",
      });
    }
  };
};
//----------------------------------------------------------------
export const LogOut = (token, navigate) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + "/auths/logout", null, token);
      // console.log(res.data.result);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const callAPIgetListShipper = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/shippers", null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_SHIPPER,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

//----------------------------------------------------------------
export const callAPIAdminCreateShipper = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "POST",
        URL_API + "/auths/register/shipper",
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.CREATE_SHIPPER,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

export const callAPIgetListKitchen = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/kitchens", null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_KITCHEN,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
export const callAPIgetListReq = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/request", null, token);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_REQ,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
export const callAPIgetListReqByStatus = (token, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/request/status?status=${status}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_REQ,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

//----------------------------------------------------------------
export const callAPIKitchenGetListOrder = () => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/orders", null, null);
      dispatch(
        createAction({
          type: PathAction.KITCHEN_GET_LIST_ORDER,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
//----------------------------------------------------------------
export const callAPIAdminGetListOrder = () => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/orders", null, null);
      dispatch(
        createAction({
          type: PathAction.ADMIN_GET_LIST_ORDER,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

//----------------------------------------------------------------

export const callAPIgetProfileKitchen = () => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/kitchens/01", null, null);
      dispatch(
        createAction({
          type: PathAction.KITCHEN_GET_PROFILE,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

export const callAPIgetAccountCustomer = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + "/accounts?role=customer",
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT_CUSTOMER,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

export const callAPIgetAccountAdmin = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + "/accounts?role=admin",
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT_ADMIN,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

export const callAPIgetAccountManager = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + "/accounts?role=manager",
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT_MANAGER,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

export const callAPIgetAccountShipper = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + "/accounts?role=shipper",
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT_SHIPPER,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};

export const callAPIgetAccountKitchen = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + "/accounts?role=kitchen",
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT_KITCHEN,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
