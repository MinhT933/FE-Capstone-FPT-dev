// import authService from "../../service/auth.service";
// import * as PathAction from "./../PathAction";

// export const register = (username, email, password) => (dispatch) => {
//   return AuthService.register(username, email, password).then(
//     (response) => {
//       // dispatch({
//       //   type: REGISTER_SUCCESS,
//       // });

//       dispatch({
//         type: PathAction.SET_MESSAGE,
//         payload: response.data.message,
//       });

//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       // dispatch({
//       //   type: REGISTER_FAIL,
//       // });

//       dispatch({
//         type: PathAction.SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   );
// };

// export const login = (username, password) => (dispatch) => {
//   return authService.login(username, password).then(
//     (data) => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: { user: data },
//       });

//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: LOGIN_FAIL,
//       });

//       dispatch({
//         type: PatchAtion.SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   );
// };

// export const logout = () => (dispatch) => {
//   AuthService.logout();

//   dispatch({
//     type: PathAction.LOGOUT,
//   });
// };
