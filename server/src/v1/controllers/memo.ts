import { Response } from "express";
import { Memo } from "../models/memo";
import { UserRequest } from "../types/user";

export const createMemo = async (req: UserRequest, res: Response) => {
  try {
    const memoCount = await Memo.find().countDocuments();

    const memo = await Memo.create({
      user: req.body._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (error) {
    res.status(500).json(error);
  }
};
