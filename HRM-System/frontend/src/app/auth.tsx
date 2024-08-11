import axios from "axios";
import { store } from "../store"; // Adjust the path based on your project structure
import { startLoading, stopLoading } from "../features/common/isLoadingSlice";

const checkAuth = () => {
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = [
    "login",
    "forgot-password",
    "register",
    "documentation",
  ];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r),
  );

  if (!TOKEN && !isPublicPage) {
    window.location.href = "/login";
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;

    axios.interceptors.request.use(
      (config) => {
        store.dispatch(startLoading());
        return config;
      },
      (error) => {
        store.dispatch(stopLoading());
        return Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      (response) => {
        store.dispatch(stopLoading());
        return response;
      },
      (error) => {
        store.dispatch(stopLoading());
        return Promise.reject(error);
      },
    );

    return TOKEN;
  }
};

export default checkAuth;
