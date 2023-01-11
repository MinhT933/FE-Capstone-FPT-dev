import * as PathAction from "../PathAction";
const initialState = {
  food: [],
  listFood: [],
  valueTag: [],
  listCategory: [],
  ListStation: [],
  listFoodPackage: [],
  listGroupFood: [],
  listTimeFrame: [],
  count: [],
  listFoodByGroupFoodID: [],
  // TimeFrame: [],

  listStation: [],
  listKitchen: [],
  listShipper: [],
  shipper: [],

  accountCustomer: [],
  accountAdmin: [],
  accountManager: [],
  accountShipper: [],
  accountKitchen: [],

  order: [],

  listOrder: [],
  listOrderK: [],
  profileKitchen: [],

  currentUser: [],
  listCategoryPackage: [],
  listFoodActive: [],
  profiles: [],
  listRequests: [],
  shipPerOfKitchen: [],
  shipPerByID: [],
  listOderByDate: [],
  listGroupFoodByStatus: [],
  listShipperActive: [],

  shipPerOfKitchen: [],
  feedback: [],
  orderByWeek: [],
  listSlots: [],
  listStatiobyidkitchen: [],
  listShipperActiveAccount: [],
  listSub: [],

  listDelivery: [],
  listFoodPrepare: [],

  listShipperByStatus: [],
  listIdKitchen: [],
  listKitchenActive: [],
  rate: [],
  dateRange: {},

  packageItem: [],
  session: [],
  detailSession: [],
  flag: [],
  shipperbyIDkitchen: [],
  listTrip: [],
  totalfood: [],
  listripByID: [],
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case PathAction.SET_PACKAGE_ITEM:
      state.packageItem = payload;
      break;
    case PathAction.GET_LIST_TRIP_BY_ID:
      state.listripByID = payload;
      break;
    case PathAction.GET_LIST_TRIP:
      state.listTrip = payload;
      break;
    case PathAction.GET_LIST_FOOD:
      state.listFood = payload;
      break;
    case PathAction.GET_LIST_TOTALFOOD:
      state.totalfood = payload;
      break;
    case PathAction.GET_LIST_SESSION:
      state.session = payload;
      state.flag = payload;
      break;
    case PathAction.FILLTER_FLAG:
      const filter = state.session.filter((c) => c.timeSlot.flag === +payload);
      state.flag = filter;
      break;
    case PathAction.GET_LIST_SESSION_DETAIL:
      state.detailSession = payload;
      break;
    case PathAction.SET_VALUE_TAG:
      state.valueTag = payload;
      break;
    case PathAction.GET_LIST_SHIPPER_BY_IDKITCHEN:
      state.shipperbyIDkitchen = payload;
      break;
    case PathAction.SET_DATE_RANGE:
      state.dateRange = payload;
      break;
    case PathAction.GET_LIST_FOOD_ACTIVE:
      state.listFoodActive = payload;
      break;
    case PathAction.GET_COUNT:
      state.count = payload;
      break;
    case PathAction.GET_LIST_FEEDBACK:
      state.feedback = payload;
      state.rate = payload;
      break;
    case PathAction.GET_LIST_FOODCATEGORY:
      state.listCategory = payload;
      break;
    case PathAction.GET_LIST_CATE_PACKAGE:
      state.listCategoryPackage = payload;
      break;
    case PathAction.FILLTER_RATE:
      const fillter = state.rate.filter((c) => c.packageRate === +payload);
      state.feedback = fillter;
      break;
    //=====================================================
    case PathAction.GET_LIST_STATIONS:
      state.listStation = payload;
      break;

    //=====================================================
    case PathAction.GET_ACCOUNT_CUSTOMER:
      state.accountCustomer = payload;
      break;

    case PathAction.GET_ACCOUNT_ADMIN:
      state.accountAdmin = payload;
      break;

    case PathAction.GET_ACCOUNT_MANAGER:
      state.accountManager = payload;
      break;

    case PathAction.GET_ACCOUNT_SHIPPER:
      state.accountShipper = payload;
      break;
    case PathAction.GET_TRIP_BY_STATUS:
      state.tripbyStatus = payload;
      break;

    case PathAction.GET_ACCOUNT_KITCHEN:
      state.accountKitchen = payload;
      break;
    case PathAction.GET_LIST_STATIONS_KITCHENID:
      state.listStatiobyidkitchen = payload;
      break;
    //=====================================================
    case PathAction.GET_LIST_KITCHEN:
      state.listKitchen = payload;
      break;

    case PathAction.GET_LIST_KITCHENID:
      state.listIdKitchen = payload;
      break;

    case PathAction.GET_LIST_KITCHEN_ACTIVE:
      state.listKitchenActive = payload;
      break;

    //=====================================================
    case PathAction.GET_LIST_SHIPPER:
      state.listShipper = payload;
      break;
    case PathAction.GET_LIST_PREPARE_ORDER_BY_DATE:
      state.listFoodPrepare = payload;
      break;

    case PathAction.GET_SHIPPER_STATUS:
      state.listShipperByStatus = payload;
      break;

    //=====================================================
    case PathAction.CREATE_SHIPPER:
      state.shipper = payload;
      break;
    //=====================================================
    case PathAction.KITCHEN_GET_LIST_ORDER:
      state.listOrderK = payload;
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

    case PathAction.GET_LIST_DELIVERY:
      state.listDelivery = payload;
      // console.log(payload);
      break;

    case PathAction.GET_LIST_PREPARE_ORDER_BY_WEEK:
      state.listFoodPrepare = payload;
      break;

    case PathAction.GET_FOOD:
      state.food = payload;
      break;
    case PathAction.GET_LIST_SLOT:
      state.listSlots = payload;
      break;
    case PathAction.GET_LIST_PACKAGE_FOOD:
      state.listFoodPackage = payload;
      break;
    case PathAction.GET_LIST_GROUP_FOOD:
      state.listGroupFood = payload;
      break;
    case PathAction.GET_LIST_GROUPFOOD_BY_STATUS:
      state.listGroupFoodByStatus = payload;
      break;
    case PathAction.GET_LIST_SUB:
      state.listSub = payload;
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
    case PathAction.GET_SHIPPER_ACTIVE:
      state.listShipperActive = payload;
      state.valueTag = payload.listShipperActive?.map(
        (item) => item.account.profile.fullName
      );
      break;
    case PathAction.GET_SHIPPER_ACTIVE_ACCOUNT:
      state.accountShipper = payload;
      break;
    case PathAction.GET_PROFILE:
      state.profiles = payload;
      break;
    case PathAction.GET_LIST_STATION_OF_KITCHEN:
      state.stationOfKitchen = payload;
      break;
    case PathAction.GET_LIST_ORDER_TO_CREATE:
      state.orderToCreate = payload;
      break;
    case PathAction.GET_LIST_PREPARE_ORDER_BY_WEEK:
      state.orderByWeek = payload;
      break;
    case PathAction.GET_LIST_REQ:
      state.listRequests = payload;
      break;
    case PathAction.GET_LIST_SHIPPER_OF_KITCHEN:
      state.shipPerOfKitchen = payload;
      break;
    case PathAction.GET_SHIPPER_BY_ID:
      state.shipPerByID = payload;
      break;
    case PathAction.GET_LIST_ORDER_BY_DATE:
      state.listOderByDate = payload;
      break;
    default:
  }
  return { ...state };
}
