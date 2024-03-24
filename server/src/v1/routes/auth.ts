import express = require("express");
import { body } from "express-validator";
import { User } from "../models/user";
import { validate } from "../handlers/validation";
import { register } from "../controllers/user";

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

module.exports = router;
