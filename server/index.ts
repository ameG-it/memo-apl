import express = require("express");
import mongoose from "mongoose";
import "dotenv/config";

//ユーザのモデルを作成

const MONGODB_URL: string = process.env.MONGODB_URL;
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/v1", require("./src/v1/routes/auth.ts"));

const dbConnect = async () => {
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
