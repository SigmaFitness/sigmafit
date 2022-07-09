import { RequestHandler } from "express";
import { sendErrorResponse } from "./sendErrorResponse";
import jwt from "jsonwebtoken";

/**
 * Middleware function to check if the user is authenticated or not
 *
 * We'll use the middleware only if we want the authenticated users data;
 */
export const isAuthenticated: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies["sigmaKeeper"];
    const res: any = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
    req.user = res;
    next();
  } catch (err) {
    sendErrorResponse(res, {
      status: 401,
      message: err.message,
    });
  }
};

export const isNotAuthenticated: RequestHandler = (req, res, next) => {
  // TODO
  next();
};
