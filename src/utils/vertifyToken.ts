import { NextFunction, Request, Response } from "express";
import { response } from "../helpers";
import jwt from "jsonwebtoken";

const vertifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const { SECRET_KEY } = process.env;
  if (!token) {
    return response({
      statusCode: 401,
      message: "Unauthorized",
      res,
    });
  }
  jwt.verify(token, String(SECRET_KEY), (err, user) => {
    if (err) return response({ statusCode: 403, res, message: "Forbidden" });
    req.body.user = user;
    next();
  });
};

export default vertifyToken;
