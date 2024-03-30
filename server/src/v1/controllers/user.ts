import { Response } from "express";
import JWT from "jsonwebtoken";
import { decrypt, encrypt } from "../common/crypter";
import { User, IUser } from "../models/user";
import { UserRequest } from "../types/user";

export const register = async (
  req: UserRequest,
  res: Response
): Promise<void> => {
  // パスワードを受け取る
  const { password } = req.body;
  try {
    const { iv, encryptedData } = encrypt(password);
    req.body.password = encryptedData;
    req.body.passwordIv = iv;
    // ユーザの作成
    const user = await User.create(req.body);
    const token = JWT.sign({ id: user._id }, "secretley", {
      expiresIn: "24h",
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req: UserRequest, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user: IUser = await User.findOne({ username });
    if (!user) {
      res.status(401).json({
        errors: {
          param: "username",
          message: "ユーザ名もしくはパスワードが違います。",
        },
      });
    }

    const decryptPassword = decrypt(user.passwordIv, user.password);
    if (password !== decryptPassword) {
      res.status(401).json({
        errors: {
          param: "password",
          message: "ユーザ名もしくはパスワードが違います。",
        },
      });
    }
    const token = JWT.sign({ id: user._id }, "secretley", {
      expiresIn: "24h",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
};
