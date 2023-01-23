import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, response } from "../../helpers";
import { RegisterPayloadType } from "./types";

const prisma = new PrismaClient();
class RegisterControllers {
  public async createNewUser(req: Request, res: Response): Promise<Response> {
    const { emailAddress, password, firstName, lastName }: RegisterPayloadType =
      req.body;
    const whitelistEmailDomain: string[] = ["gmail.com", "twitter.com"];
    const hashedPassword = await hash({ text: password });
    const currentDate = new Date();
    if (!whitelistEmailDomain.includes(emailAddress.split("@")[1])) {
      return response({
        statusCode: 403,
        message: "Invalid email address.",
        res,
      });
    }
    if (!emailAddress || !password || !firstName || !lastName) {
      return response({
        statusCode: 400,
        message: "Payload must be provided. try again",
        res,
      });
    }
    const newUser = await prisma.users.create({
      data: {
        email: emailAddress,
        password: hashedPassword,
        registered_at: currentDate,
      },
    });
    const newUserProfile = await prisma.profiles.create({
      data: {
        first_name: firstName,
        last_name: lastName,
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
