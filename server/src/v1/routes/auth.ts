import * as express from "express";
import { Response } from "express";
import * as body from "express-validator";
import { User } from "../models/user";
import { validate } from "../handlers/validation";
import { login, register } from "../controllers/user";
import { verifyToken } from "../handlers/tokenhandler";
import { UserRequest } from "../types/user";
import asyncWrap from "../common/asyncWrapper";

const validationRules = [
  body
    .check("username")
    .isLength({ min: 8 })
    .withMessage("ユーザ名は8文字以上である必要があります。"),
  body
    .check("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります。"),
  body
    .check("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要があります。"),
  body.check("username").custom(async (value: string) => {
    await User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject(new Error("このユーザは使われています"));
      }
      return undefined;
    });
  }),
];

const router = express.Router();
router.post(
  "/register",
  validationRules,
  // body("username")
  //   .isLength({ min: 8 })
  //   .withMessage("ユーザ名は8文字以上である必要があります。"),
  // body("password")
  //   .isLength({ min: 8 })
  //   .withMessage("パスワードは8文字以上である必要があります。"),
  // body("confirmPassword")
  //   .isLength({ min: 8 })
  //   .withMessage("確認用パスワードは8文字以上である必要があります。"),
  // body("username").custom(async (value) => {
  //   return await User.findOne({ username: value }).then((user) => {
  //     if (user) {
  //       return Promise.reject("このユーザは使われています");
  //     }
  //   });
  // }),
  validate,
  asyncWrap(register)
);

// ログイン用API
router.post(
  "/login",
  body
    .check("username")
    .isLength({ min: 8 })
    .withMessage("ユーザ名は8文字以上です"),
  body
    .check("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上です"),
  validate,
  asyncWrap(login)
);

// JWT検証用
router.post(
  "/jwt",
  asyncWrap(verifyToken),
  (req: UserRequest, res: Response) => {
    res.status(200).json({ user: req.body });
  }
);

export default router;

// module.exports = router;
