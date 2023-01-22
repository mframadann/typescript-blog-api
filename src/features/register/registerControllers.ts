import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, response } from "../../helpers";
import { BodyValues } from "./types";

const prisma = new PrismaClient();
class RegisterControllers {
  public async createNewUser(req: Request, res: Response): Promise<Response> {
    const whitelistEmailDomain: string[] = ["gmail.com", "twitter.com"];
    const { email, password }: BodyValues = req.body;
    const hashedPassword = await hash({ text: password });
    const currentDate = new Date();
    if (!whitelistEmailDomain.includes(email.split("@")[1])) {
      return response({
        statusCode: 403,
        message: "Invalid email address",
        res,
      });
    }
    if (!email || !password) {
      return response({
        statusCode: 400,
        message: "Payload must be provided",
        res,
      });
    }
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        registered_at: currentDate,
      },
    });
    const newUserProfile = await prisma.profiles.create({
      data: {
        user_id: newUser.user_id,
      },
    });
    return response({
      message: "Successfully created new user.",
      statusCode: 201,
      data: {
        user: newUser,
        profile: newUserProfile,
      },
      res,
    });
  }
}

export default new RegisterControllers();
