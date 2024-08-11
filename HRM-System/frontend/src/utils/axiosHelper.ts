import axios from "axios";
import { store } from "../store";
import { setLoginError } from "../features/common/errorsSlice";

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}`, error);
    throw error;
  }
};

export const postData = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response = await axios.post<T>(url, data);
    return response.data;
  } catch (error:any) {
    if (error.response) {
      // If there's an error response from the server, dispatch it to the Redux store
      store.dispatch(setLoginError(error.response.statusText || "Unknown error"));
    } else {
      store.dispatch(setLoginError("Network error"));
    }
    throw error;
  }
};


export const deleteData = async <T>(url:string): Promise<T> => {
  try {
    const response = await axios.delete<T>(url);
    return response.data;
  } catch (error:any) {
    if (error.response) {
      // If there's an error response from the server, dispatch it to the Redux store
      store.dispatch(setLoginError(error.response.statusText || "Unknown error"));
    } else {
      store.dispatch(setLoginError("Network error"));
    }
    throw error;
  }
};
