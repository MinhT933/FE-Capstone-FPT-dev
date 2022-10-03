// import API from "../Axios/API/API";
// import TokenService from "./token.service";
// import { refreshToken } from "../actions/auth";

// const SetupInterceptors = (store) => {

//   API.interceptors.request.use(
//     (config) => {
//       const token = TokenService.getLocalAccessToken();
//       if (token) {
//         // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
//         config.headers["x-access-token"] = token; // for Node.js Express back-end
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   const { dispatch } = store;
//   API.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     async (err) => {
//       const originalConfig = err.config;

//       if (originalConfig.url !== "/auth/signin" && err.response) {
//         // Access Token was expired
//         if (err.response.status === 401 && !originalConfig._retry) {
//           originalConfig._retry = true;

//           try {
//             const rs = await API.post("/auth/refreshtoken", {
//               refreshToken: TokenService.getLocalRefreshToken(),
//             });

//             const { accessToken } = rs.data;

//             dispatch(refreshToken(accessToken));
//             TokenService.updateLocalAccessToken(accessToken);

//             return API(originalConfig);
//           } catch (_error) {
//             return Promise.reject(_error);
//           }
//         }
//       }

//       return Promise.reject(err);
//     }
//   );
// };

// export default SetupInterceptors
