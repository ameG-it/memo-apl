import { Request, Response } from "express";
import { encrypt } from "../common/crypter";
import { User } from "../models/user";
import JWT from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  //パスワードを受け取る
  const password = req.body.password;
  try {
    const { iv, encryptedData } = encrypt(password);
    req.body.password = encryptedData;
    req.body.passwordIv = iv;
    //ユーザの作成
    const user = await User.create(req.body);
    const token = JWT.sign({ id: user._id }, "secretley", {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};
