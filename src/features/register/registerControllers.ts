import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, response } from "../../helpers";
import { RegisterPayloads } from "./types";

const prisma = new PrismaClient();
class RegisterControllers {
  public async createNewUser(req: Request, res: Response): Promise<Response> {
    const { emailAddress, password, firstName, lastName }: RegisterPayloads =
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
    try {
      const newUserWithProfile = await prisma.users.create({
        data: {
          email: emailAddress,
          password: hashedPassword,
          registered_at: currentDate,
          profile: {
            create: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        },
      });
      return response({
        message: "Successfully created new user.",
        statusCode: 201,
        data: {
          user: newUserWithProfile,
        },
        res,
      });
    } catch (error: any) {
      return response({
        message: error.message,
        statusCode: 500,
        res,
      });
    }
  }
}

export default new RegisterControllers();
