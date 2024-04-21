import { AxiosResponse } from "axios";

type errors = {
  location: string;
  msg: string;
  path: string;
  value: string;
};

export interface IUser {
  _id: string;
  username: string;
  password: string;
  passwordIv: string;
}

export interface AxiosErrResponse extends AxiosResponse {
  errors: errors[];
}

export interface AxiosUserResponse extends AxiosResponse {
  user: IUser;
}
