import { Request, Response } from "express";
import { decrypt, encrypt } from "../common/crypter";
import { User, IUser } from "../models/user";
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

export const login = async (req: Request<IUser>, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: {
          param: "username",
          message: "ユーザ名もしくはパスワードが違います。",
        },
      });
    }

    const decryptPassword = decrypt(user.passwordIv, user.password);
    if (password !== decryptPassword) {
      return res.status(401).json({
        errors: {
          param: "password",
          message: "ユーザ名もしくはパスワードが違います。",
        },
      });
    }
    const token = JWT.sign({ id: user._id }, "secretley", {
      expiresIn: "24h",
    });
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};
