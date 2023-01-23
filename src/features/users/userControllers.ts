import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { response } from "../../helpers";
import { UsersQueryParams } from "./types/index";

const prisma = new PrismaClient();
class UsersControllers {
  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const { profile = false, media = false }: UsersQueryParams = req.query;
    const allUsers = await prisma.users.findMany({
      select: {
        user_id: true,
        email: true,
        registered_at: true,
        profile: profile
          ? {
              include: {
                media,
              },
            }
          : profile,
      },
    });
    if (!allUsers) {
      return response({
        statusCode: 204,
        message: "Users data will be shown, please register",
        res,
      });
    }
    return response({
      statusCode: 200,
      message: "Successfully find all users",
      data: allUsers,
      res,
    });
  }

  public async getOneUser(req: Request, res: Response): Promise<Response> {
    const {
      user_id,
      profile = false,
      media = false,
    }: UsersQueryParams = req.query;
    if (!user_id) {
      return response({
        statusCode: 400,
        message: "Cannot get user without null id.",
        res,
      });
    }
    const userData = await prisma.users.findUnique({
      where: {
        user_id: Number(user_id),
      },
      select: {
        email: true,
        registered_at: true,
        profile: profile
          ? {
              include: {
                media,
              },
            }
          : profile,
      },
    });
    return response({
      statusCode: 200,
      message: "Successfully get specified users",
      data: userData,
      res,
    });
  }
}

export default new UsersControllers();
