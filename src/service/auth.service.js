import { URL_API } from "../Axios/URL_API/URL";
import API from "./../Axios/API/API";

// const register = (username, email, password) => {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password,
//     });
//   };

const login = (username, password) => {
  return API("POST", URL_API, { username, password }).then((res) => {
    if (res.data.accessToken) {
      localStorage.setItem("admin", JSON.stringify(res.data));
    }
    return res.data;
  });
};

const logout = () => {
    localStorage.removeItem("admin");
  };

  export default {
    // register,
    login,
    logout,
  };