import "dotenv/config"; // eslint-disable-line import/no-extraneous-dependencies
import express from "express";
import cors from "cors"; // eslint-disable-line import/no-extraneous-dependencies
import mongoose from "mongoose";
import userRouter from "./src/v1/routes/auth";

// ユーザのモデルを作成

const { MONGODB_URL, CLIENT_ORIGIN, PORT } = process.env;
const app = express();

// クライアントのオリジンを許可
app.use(cors({ origin: CLIENT_ORIGIN })); // eslint-disable-line import/no-extraneous-dependencies

// その他のルートとミドルウェアの設定
app.use(express.json());

app.use("/api/v1", userRouter);

try {
  await mongoose.connect(MONGODB_URL);
} catch (error) {
  // デバック用
  console.log(error); // eslint-disable-line import/no-extraneous-dependencies
}

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  // デバック用
  console.log("サーバ起動"); // eslint-disable-line import/no-extraneous-dependencies
});
