import axiosClient from "./axiosClient";

interface AuthApiParams {
  username: string;
  password: string;
  confirmPassword: string;
}

const authApi = {
  register: (params: AuthApiParams) =>
    axiosClient.post("/auth/register", params),
};

export default authApi;
