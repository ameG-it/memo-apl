import "dotenv/config"; // eslint-disable-line import/no-extraneous-dependencies
import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/v1/routes/auth";

// ユーザのモデルを作成

const { MONGODB_URL } = process.env;
const app = express();
const PORT = 3000;

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
