import { AxiosResponse } from "axios";

type erroes = {
  location: string;
  msg: string;
  path: string;
  value: string;
};

export interface AxiosErrResponse extends AxiosResponse {
  erroes: erroes[];
}
