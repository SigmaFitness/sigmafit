import { user } from "@prisma/client";
import { Response } from "express";
import jwt from "jsonwebtoken";

export type jwtUserPayloadType = {
  id: string;
  email: string;
  fName: string;
  lName: string;
};
/**
 * Utility function to set auth token
 */
export const setAuthTokenAsCookie = (res: Response, user: user) => {
  // create auth token
  const jwtPayload: jwtUserPayloadType = {
    id: user.id,
    email: user.email,
    fName: user.first_name,
    lName: user.last_name,
  };
  const token = jwt.sign(jwtPayload, process.env.JSON_WEB_TOKEN_SECRET);
  return res.cookie("sigmaKeeper", token, {
    secure: process.env.USE_SECURE_COOKIE === "1" ? true : false,
    sameSite: "lax",
    httpOnly: true,
    maxAge: 7 * 24 * 3600000, // 7 days
  });
};
