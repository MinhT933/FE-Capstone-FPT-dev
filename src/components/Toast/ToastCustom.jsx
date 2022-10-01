import { toast } from "react-toastify";
import Iconify from "../hook-form/Iconify";

// interface ICustomizedToast {
//   message: string;
//   type: string;
// }

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
export const CustomizedToast = ({ message, type }) => {
  switch (type) {
    case "SUCCESS":
      toast.success(`👌 ${message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "ERROR":
      toast.error(` ${message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "LOADING":
      toast.loading(` ${message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
  }
};
