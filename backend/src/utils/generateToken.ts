import jwt from "jsonwebtoken";
import { Response } from "express";

const generateTokenAndSessionCookie = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    httpOnly: true, // prevent XSS attack cross-site scripting
    sameSite: "strict", // prevent csrf attack cross-site request forgery
    secure: process.env.NODE_ENV !== "development", // cookie only works in https
  });

  return token;
};

export default generateTokenAndSessionCookie;
