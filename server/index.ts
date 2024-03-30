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

const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};
dbConnect();
app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log("サーバ起動");
});
