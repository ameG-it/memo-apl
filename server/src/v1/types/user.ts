import { Request } from "express";
import { IUser } from "../models/user";

export interface UserRequest extends Request {
  body: IUser; // 独自の型を設定
}
