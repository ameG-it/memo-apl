import JWT from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user";
import { NextFunction, Request, Response } from "express";

//jwtを復号
const tokenDecode = (req: Request) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

//jwt検証
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    //JWTと一致するユーザを取得
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("権限がありません");
    }
    req.body.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
