import * as PathAction from "../PathAction";
const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = admin
  ? { isLoggedIn: true, admin }
  : { isLoggedIn: false, admin: null };

export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PathAction.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        admin: payload.admin,
      };
    case PathAction.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        admin: null,
      };
    case PathAction.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        admin: null,
      };
    default:
      return state;
  }
}
