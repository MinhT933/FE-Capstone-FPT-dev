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
import { GET_LIST_GROUP_FOOD } from "./../PathAction";
//B3
//nhận 2 tham số State và action
//dây là store
// đây tạo giá trị khởi tạo cho nó

const initialState = {
  food: [],
  listFood: [],
  valueTag: [],
  listCategory: [],
  ListStation: [],
  listFoodPackage: [],
  listGroupFood: [],
  listTimeFrame: [],
  listFoodByGroupFoodID: [],
  // TimeFrame: [],

  listStation: [],
  listKitchen: [],
  listShipper: [],
  shipper: [],

  listUser: [],
  listOrder: [],
  profileKitchen: [],

  currentUser: [],
  listCategoryPackage: [],
};

// const initialStateAuthen = admin
//   ? { isLoggedIn: true, admin }
//   : { isLoggedIn: false, admin: null };

// const admin = JSON.parse(localStorage.getItem("admin"));

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case PathAction.GET_LIST_FOOD:
      state.listFood = payload;

      //nôm na dòng 35 là là ừ với cái trường case GET_LIST_FOOD
      //thì lưu data vào listFood
      // giờ có data rồi nè muốn núm nó ra xài lúc nào ở đâu cũng đc
      // cái này chỉ lưu khi m thấy nó cần xài nhiều chỗ
      // hình dung như cái nhà kho zị á :v
      // nếu mày quăng nhiều đồ ko cần thiết nó sẽ gây ra chật chỗ của mày
      //b4 hãy vào food.jsx mà coi tiếp nha (cách núm data bỏ vào)

      //lưu data
      break;
    case PathAction.SET_VALUE_TAG:
      state.valueTag = payload;
      break;
    case PathAction.GET_LIST_FOODCATEGORY:
      state.listCategory = payload;
      break;
    case PathAction.GET_LIST_CATE_PACKAGE:
      state.listCategoryPackage = payload;
      break;
    //=====================================================
    case PathAction.GET_LIST_STATIONS:
      state.listStation = payload;
      // console.log(payload);
      break;
    //=====================================================
    case PathAction.GET_LIST_USER:
      state.listUser = payload;
      break;
    //=====================================================
    case PathAction.GET_LIST_KITCHEN:
      state.listKitchen = payload;
      break;
    //=====================================================
    case PathAction.GET_LIST_SHIPPER:
      state.listShipper = payload;
      break;
    //=====================================================
    case PathAction.CREATE_SHIPPER:
      state.shipper = payload;
      break;
    //=====================================================
    case PathAction.KITCHEN_GET_LIST_ORDER:
      state.listOrder = payload;
      break;
    //=====================================================
    case PathAction.ADMIN_GET_LIST_ORDER:
      state.listOrder = payload;
      break;
    //=====================================================
    case PathAction.KITCHEN_GET_PROFILE:
      state.profileKitchen = payload;
      break;
    //=====================================================
    case PathAction.GET_FOOD:
      state.food = payload;
      break;
    case PathAction.GET_LIST_PACKAGE_FOOD:
      state.listFoodPackage = payload;
      break;
    case PathAction.GET_LIST_GROUP_FOOD:
      state.listGroupFood = payload;
      break;
    case PathAction.GET_LIST_TIME_FRAME:
      state.listTimeFrame = payload;
      break;
    case PathAction.LOGIN_USER:
      state.currentUser = payload;
      break;
    case PathAction.GET_LIST_FOOD_BY_FOODGROUP_ID:
      state.listFoodByGroupFoodID = payload;
      state.valueTag = payload.foods.map((item) => item.name);
      break;

    default:
  }
  return { ...state };
}
