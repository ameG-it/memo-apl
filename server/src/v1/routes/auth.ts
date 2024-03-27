import express = require("express");
import { body } from "express-validator";
import { IUser, User } from "../models/user";
import { validate } from "../handlers/validation";
import { login, register } from "../controllers/user";
import { decrypt } from "../common/crypter";
import { Request, Response } from "express";
import { verifyToken } from "../handlers/tokenhandler";

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
  login
);

//JWT検証用
router.post("/jwt", verifyToken, (req, res) => {
  return res.status(200).json({ user: req.body.user });
});

module.exports = router;
