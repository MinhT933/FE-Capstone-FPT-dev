import API from "../Axios/API/API";
import { URL_API } from "../Axios/URL_API/URL";

const getPublicContent = () => {
  return API("GET", URL_API + "all");
};

const getAdminBoard = () => {
  return API("GET", URL_API + "admin", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return API("GET", URL_API + "mod", { headers: authHeader() });
};

export default {
  getPublicContent,
  // getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
