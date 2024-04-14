import JWT from "jsonwebtoken";
import "dotenv/config"; // eslint-disable-line import/no-extraneous-dependencies
import { NextFunction, Response } from "express";
import { User } from "../models/user";
import { UserRequest } from "../types/user";

// jwtを復号
const tokenDecode = (req: UserRequest) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    // const bearer = bearerHeader.split(" ")[1];

    try {
      const decodedToken = JWT.verify(
        bearerHeader,
        process.env.TOKEN_SECRET_KEY
      );
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

// jwt検証
export const verifyToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded && typeof tokenDecoded !== "string") {
    // JWTと一致するユーザを取得
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      res.status(401).json("権限がありません");
    } else {
      req.body = user;
      next();
    }
  } else {
    res.status(401).json("権限がありません");
  }
};
