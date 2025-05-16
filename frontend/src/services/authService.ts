import { AxiosError } from "axios";
import axiosInstance from "../utils/axiosInstance";
import { clearUser, setCredentials } from "@/redux/features/authSlice";
import type { AppDispatch } from "@/redux/store";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", { name, email, password }, { withCredentials: true });
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return error.response;
    } else {
      throw new Error("unknown error occured");
    }
  }
};

export const login = async (email: string, password: string, dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", { email, password }, { withCredentials: true });

    dispatch(
      setCredentials({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );

    console.log(response.data.accessToken, "response.data.accessToken");
    console.log(response.data.user, "response.data.user");

    localStorage.clear();
    localStorage.setItem("isAuthenticated", "true");
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return error.response;
    } else {
      throw new Error("unknown error occured");
    }
  }
};

export const userLogout = async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/api/auth/logout", {}, { withCredentials: true });

    if (response.status === 200) {
      dispatch(clearUser());
    }

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("error while logging out");
  }
};

export const refreshToken = async (dispatch: AppDispatch) => {
  try {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "true") {
      const response = await axiosInstance.post(`/api/auth/refresh-token`, {}, { withCredentials: true });

      dispatch(setCredentials({ accessToken: response.data.accessToken, user: response.data.user }));
      return response.data.accessToken;
    }
    throw new Error("Session expired. Please log in again");
  } catch (error) {
    console.log(error);
    //   dispatch(logout());
    throw new Error("Session expired. Please log in again.");
  }
};
