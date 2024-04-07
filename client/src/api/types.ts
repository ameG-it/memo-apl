import { AxiosResponse } from "axios";

type errors = {
  location: string;
  msg: string;
  path: string;
  value: string;
};

export interface AxiosErrResponse extends AxiosResponse {
  errors: errors[];
}
