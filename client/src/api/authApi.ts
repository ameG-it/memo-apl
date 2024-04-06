import axiosClient from "./axiosClient";

export interface AuthApiParams {
  username: string;
  password: string;
  confirmPassword: string;
}

const authApi = {
  register: (params: AuthApiParams) => axiosClient.post("/register", params),
};

export default authApi;
