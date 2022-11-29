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
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const callAPIgetListFoodfilterCate = (token, id, status) => {
  return async (dispatch) => {
    if (id === null || id === undefined || id === "") {
      CustomizedToast({
        message: `Vui lòng chọn loại thức ăn trước`,
        type: "ERROR",
      });
    } else {
      try {
        const res = await API(
          "GET",
          URL_API +
            `/foods/byCatefory_filter?categoryId=${id}&status=${status}`,
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
        dispatch(
          createAction({
            type: PathAction.GET_LIST_FOOD,
            payload: [],
          })
        );
        CustomizedToast({
          message: `Không tìm thấy dữ liệu`,
          type: "ERROR",
        });
      }
    }
  };
};

export const callAPIgetListFoodActive = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + "/foods/byStatus?statusFood=active",
        null,
        token
      );

      dispatch(
        createAction({
          type: PathAction.GET_LIST_FOOD_ACTIVE,
          payload: res.data.result,
        })
      );
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const callAPIGetListOderByDay = (token, date, status) => {
  return async (dispatch) => {
    try {
      if (status === null) {
        const res = await API(
          "GET",
          URL_API + `/orders/order-date?deliveryDate=${date}`,
          null,
          token
        );
        dispatch(
          createAction({
            type: PathAction.GET_LIST_ORDER_BY_DATE,
            payload: res.data.result,
          })
        );
      } else {
        const res = await API(
          "GET",
          URL_API + `/orders/order-date?deliveryDate=${date}&status=${status}`,
          null,
          token
        );
        dispatch(
          createAction({
            type: PathAction.GET_LIST_ORDER_BY_DATE,
            payload: res.data.result,
          })
        );
      }

      // console.log(res.data.result);
    } catch (err) {
      CustomizedToast({
        message: `${err.response.data.message}`,
        type: "ERROR",
      });
    }
  };
};

export const callAPIGetListPack = async (token, status) => {
  return async (dispatch) => {
    try {
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
      dispatch(
        createAction({
          type: PathAction.GET_LIST_PACKAGE_FOOD,
          payload: [],
        })
      );
      CustomizedToast({
        message: "Không tìm thấy gói ăn",
        type: "ERROR",
      });
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
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const callAPIgetListStationbyidKitchen = (token, id) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/stations/byKitchenId?kitchenId=${id}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_STATIONS_KITCHENID,
          payload: res.data.result,
        })
      );
    } catch (err) {
      dispatch(
        createAction({
          type: PathAction.GET_LIST_STATIONS_KITCHENID,
          payload: null,
        })
      );
      CustomizedToast({
        // message: `${err.response.data.message}`,
        message: "Không tìm thất địa điểm giao",
        type: "ERROR",
      });
    }
  };
};

export const callAPIgetListStationByStatus = (token, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/stations/byStatus?status=${status}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_STATIONS,
          payload: res.data.result,
        })
      );
    } catch (err) {
      dispatch(
        createAction({
          type: PathAction.GET_LIST_STATIONS,
          payload: [],
        })
      );
      CustomizedToast({
        message: "Không tìm thấy gói ăn",
        type: "ERROR",
      });
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
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const getAPIgetGroupFoodByStatus = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + "/food-groups/byStatus?statusFG=active",
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_GROUPFOOD_BY_STATUS,
          payload: res.data.result,
        })
      );
    } catch (err) {
      dispatch(
        createAction({
          type: PathAction.GET_LIST_GROUPFOOD_BY_STATUS,
          payload: [],
        })
      );
      CustomizedToast({
        message: "Không tìm thấy gói ăn",
        type: "ERROR",
      });
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
      dispatch(
        createAction({
          type: PathAction.GET_LIST_GROUP_FOOD,
          payload: [],
        })
      );
      CustomizedToast({
        message: "Không tìm thấy nhóm thức",
        type: "ERROR",
      });
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
    } catch (err) {}
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
    } catch (err) {}
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
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const callAPIGetStationByKitchen = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/stations/byKitchen`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_STATION_OF_KITCHEN,
          payload: res.data.result,
        })
      );
    } catch (err) {}
  };
};

export const callAPIGetSlot = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + `/time-slots`, null, token);

      dispatch(
        createAction({
          type: PathAction.GET_LIST_SLOT,
          payload: res.data.result,
        })
      );
    } catch (err) {}
  };
};

export const callAPIGetListDelivery = (token, status, valueStarTime) => {
  return async (dispatch) => {
    try {
      // const res = await API("GET", URL_API + `/delivery_trips/byKitchen?status=${status}&deliveryDate=${valueStarTime}`, null, token);

      const res = await API(
        "GET",
        URL_API +
          "/delivery_trips/byKitchen?status=" +
          status +
          "&deliveryDate=" +
          valueStarTime,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_DELIVERY,
          payload: res.data.result,
        })
      );
    } catch (err) {}
  };
};

export const callAPIgetOrdertoCreateDeliveryTrip = (
  token,
  slot,
  valueStarTime,
  stationID,
  kitchenID
) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API +
          `/orders/byKitchen?stationId=f2fda2c1-1809-4cb3-8ffe-f2526a18302b&kitchenId=4f0b492d-d646-4e2b-9b39-1c453e4e6c9f&time_slotId=f67h8204ih3945h893u45uh89hjh98345h9&deliveryDate=2022-11-24`,
        null,
        token
      );
      // const res = await API(
      //   "GET",
      //   URL_API +
      //     `/orders/byKitchen?stationId=${stationID}&kitchenId=${kitchenID}&time_slotId=${slot}&deliveryDate=${valueStarTime}`,
      //   null,
      //   token
      // );
      dispatch(
        createAction({
          type: PathAction.GET_LIST_ORDER_TO_CREATE,
          payload: res.data.result,
        })
      );
    } catch (err) {
      dispatch(
        createAction({
          type: PathAction.GET_LIST_ORDER_TO_CREATE,
          payload: [],
        })
      );
      CustomizedToast({
        message: "KHông tìm thấy dữ liệu",
        type: "ERROR",
      });
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
    } catch (err) {}
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
    } catch (err) {}
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
      } else {
        CustomizedToast({
          message: "Tài khoản không có quyền truy cập",
          type: "ERROR",
        });
      }
    } catch (error) {
      CustomizedToast({
        message: "Tên đăng nhập hoặc mật khẩu sai",
        type: "ERROR",
      });
    }
  };
};
//------------------------------------------------------------------
export const checkphone = (phone) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + `/auths/login`, phone);
      localStorage.setItem("token", res.data.result.access_token);

      dispatch(
        createAction({
          type: PathAction.LOGIN_USER,
          payload: res.data.result,
        })
      );
    } catch (error) {
      CustomizedToast({
        message: "số điện thoại không đúng",
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

//----------------------------------------------------------------
export const LogOut = (token, navigate) => {
  return async (dispatch) => {
    try {
      const res = await API("POST", URL_API + "/auths/logout", null, token);
      // console.log(res.data.result);

      navigate("/");
      localStorage.removeItem("token");
    } catch (error) {
      // console.log(error);
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
    } catch (err) {}
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
    } catch (err) {}
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
    } catch (err) {}
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
      // CustomizedToast({
      //   message: `${err.response.data.message}`,
      //   type: "ERROR",
      // });
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
      if (res.data.result != null) {
        dispatch(
          createAction({
            type: PathAction.GET_LIST_REQ,
            payload: res.data.result,
          })
        );
      } else {
      }
    } catch (err) {
      // CustomizedToast({
      //   message: `Không có data`,
      //   type: "ERROR",
      // });

      dispatch(
        createAction({
          type: PathAction.GET_LIST_REQ,
          payload: null,
        })
      );
    }
  };
};

//----------------------------------------------------------------
export const callAPIKitchenGetListOrder = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/subscriptions", null, token);
      dispatch(
        createAction({
          type: PathAction.KITCHEN_GET_LIST_ORDER,
          payload: res.data.result,
        })
      );
    } catch (err) {}
  };
};
//----------------------------------------------------------------
export const callAPIAdminGetListOrder = (token) => {
  return async (dispatch) => {
    try {
      const res = await API("GET", URL_API + "/subscriptions", null, token);
      dispatch(
        createAction({
          type: PathAction.ADMIN_GET_LIST_ORDER,
          payload: res.data.result,
        })
      );
    } catch (err) {}
  };
};

//----------------------------------------------------------------

export const callAPIgetShipperActive = (token) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + "/shippers?status=new",
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_SHIPPER_ACTIVE,
          payload: res.data.result,
        })
      );
      console.log(res.data.result);
    } catch (err) {}
  };
};

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
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const callAPIgetAccountCustomerByStatus = (token, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/accounts?role=customer&status=${status}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT_CUSTOMER,
          payload: res.data.result,
        })
      );
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const callAPIgetAccountAdminByStatus = (token, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/accounts?role=admin&status=${status}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT_ADMIN,
          payload: res.data.result,
        })
      );
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const callAPIgetAccountManagerByStatus = (token, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/accounts?role=manager&status=${status}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT_MANAGER,
          payload: res.data.result,
        })
      );
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const callAPIgetAccountShipperByStatus = (token, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",

        URL_API + `/accounts?role=shipper&status=${status}`,

        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_SHIPPER_ACTIVE,
          payload: res.data.result,
        })
      );
      console.log(res.data.result);
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const callAPIgetAccountKitchenByStatus = (token, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/accounts?role=manager&status=${status}`,
        null,
        token
      );
      dispatch(
        createAction({
          type: PathAction.GET_ACCOUNT_KITCHEN,
          payload: res.data.result,
        })
      );
    } catch (err) {}
  };
};

export const callAPIKitchenPrepareOrder = (token, date, status) => {
  return async (dispatch) => {
    try {
      const res = await API(
        "GET",
        URL_API + `/orders/food-prepare?deliveryDate=${date}`,
        null,
        token
      );
      console.log(res);
      dispatch(
        createAction({
          type: PathAction.GET_LIST_PREPARE_ORDER_BY_DATE,
          payload: res.data.result,
        })
      );
    } catch (err) {
      console.log({ err });
    }
  };
};
