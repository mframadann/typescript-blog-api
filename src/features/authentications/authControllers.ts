import { Request, Response } from "express";
import { createToken, response } from "../../helpers";
import { PrismaClient } from "@prisma/client";
import { LoginPayloads } from "./types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
class AuthControllers {
  public async login(req: Request, res: Response): Promise<Response> {
    const { emailAddress, password }: LoginPayloads = req.body;
    const user = await prisma.users.findFirst({
      where: {
        email: emailAddress,
      },
    });
    switch (user) {
      case null:
        return response({
          statusCode: 404,
          message: `Cannot find user with email ${emailAddress}, user doesn't exist.`,
          res,
        });
    }
    const vertifyPassword = await bcrypt.compare(
      String(password),
      user.password
    );
    if (!vertifyPassword) {
      return response({
        statusCode: 403,
        message: `Invalid password, please try again`,
        res,
      });
    }
    const userToken = createToken({
      payload: {
        identifier: user?.user_id,
        email: user?.email,
      },
      options: { expiresIn: "10m" },
    });
    const refreshToken = createToken({
      payload: {
        identifier: user?.user_id,
        email: user?.email,
      },
      type: "refresh",
      options: { expiresIn: "1h" },
    });
    return response({
      statusCode: 201,
      data: {
        token: userToken,
        refreshToken,
      },
      res,
    });
  }
  public async refreshToken(
    req: Request,
    res: Response
  ): Promise<string | Response> {
    const refreshToken = req.headers["authorization"]?.split(" ")[1];
    if (!refreshToken) {
      return response({ statusCode: 401, message: "Unauthorized", res });
    }
    const { REFRESH_TOKEN_SECRET_KEY } = process.env;
    jwt.verify(
      String(refreshToken),
      String(REFRESH_TOKEN_SECRET_KEY),
      (err, user) => {
        if (err) {
          return response({ statusCode: 403, message: "Forbidden", res });
        }
        const newToken = createToken({
          payload: user,
          type: "ACCESS_TOKEN",
          options: { expiresIn: "10m" },
        });
        req.body.token = newToken;
      }
    );
    return response({
      statusCode: 201,
      data: {
        accessToken: req.body.token,
      },
      res,
    });
  }
}
export default new AuthControllers();
