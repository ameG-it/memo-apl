import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import JWT from "jsonwebtoken";
import { encrypt, decrypt } from "./src/common/crypter.js";
import { userSchema, IUser } from "./src/v1/models/user";
import { Buffer } from "node:buffer";

//ユーザのモデルを作成
const User = mongoose.model<IUser>("User", userSchema);

const MONGODB_URL: string = process.env.MONGODB_URL;
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get(
  "/get/:id",
  (req, res, next) => {
    console.log("ID:", req.params.id);
    next();
  },
  (req, res, next) => {
    res.send("User Info" + req.params.id);
  }
);

app.listen(PORT, () => {
  console.log("サーバ起動");
});

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};
dbConnect();
//ユーザ新規登録API
app.post("/register", async (req, res) => {
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
});
