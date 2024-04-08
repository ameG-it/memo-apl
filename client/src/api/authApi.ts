import axiosClient from "./axiosClient";

export interface AuthApiRegisterParams {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthApiLoginParams {
  username: string;
  password: string;
}

export interface AuthApiVerifyTokenParams {
  username: string;
  password: string;
}

const authApi = {
  register: (params: AuthApiRegisterParams) =>
    axiosClient.post("/register", params),
  login: (params: AuthApiLoginParams) => axiosClient.post("/login", params),
  verifyToken: () => axiosClient.post("/jwt"),
};

export default authApi;
