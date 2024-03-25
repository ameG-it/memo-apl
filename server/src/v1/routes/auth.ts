import express = require("express");
import { body } from "express-validator";
import { IUser, User } from "../models/user";
import { validate } from "../handlers/validation";
import { register } from "../controllers/user";
import { decrypt } from "../common/crypter";
import { Request, Response } from "express";

//成功時の型
interface FruiResponse {}

// エラーの型
interface ErrorResponse {
  errors: {
    param: string;
    message: string;
  };
}

const router = express.Router();
router.post(
  "/register",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザ名は8文字以上である必要があります。"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります。"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要があります。"),
  body("username").custom(async (value) => {
    return await User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザは使われています");
      }
    });
  }),
  validate,
  register
);

//ログイン用API
router.post(
  "/login",
  body("username").isLength({ min: 8 }).withMessage("ユーザ名は8文字以上です"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上です"),
  validate,
  async (req: Request<IUser>, res: Response<ErrorResponse>) => {
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
      return res.status(200).json(user, token);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

module.exports = router;
