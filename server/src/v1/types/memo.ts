import { Request } from "express";
import { IMemo } from "../models/memo";

export interface MemoRequest extends Request {
  body: IMemo; // 独自の型を設定
}
