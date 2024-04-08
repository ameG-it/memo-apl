import authApi from "../api/authApi";
import { AxiosUserResponse } from "../api/types";

const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }

    try {
      const res = (await authApi.verifyToken()) as AxiosUserResponse;
      return res.data.user;
    } catch (error) {
      return false;
    }
  },
};

export default authUtils;
