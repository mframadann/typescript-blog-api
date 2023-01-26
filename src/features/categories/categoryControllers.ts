import { Request, Response } from "express";
import { response, Slugger } from "../../helpers";
import { CategoryParams, CategoryPayloads } from "./types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class CategoryControllers {
  public async getAllCategories(
    req: Request,
    res: Response
  ): Promise<Response> {
    const getCategories = await prisma.categories.findMany();
    return response({
      statusCode: 200,
      message: "Successfully get all categories",
      data:
        getCategories.length > 0
          ? getCategories
          : "Categories data will be shown here, 0 categories found",
      res,
    });
  }
  public async getCategoryById(req: Request, res: Response): Promise<Response> {
    const { category_id }: CategoryParams = req.query;
    if (!Number(category_id)) {
      return response({
        statusCode: 400,
        message: `Please insert a valid type of category_id`,
        res,
      });
    }
    const getCategoryById = await prisma.categories.findUnique({
      where: {
        category_id: Number(category_id),
      },
    });
    if (!category_id) {
      return response({
        statusCode: 400,
        message: `category_id parameter cannot be null or undefined`,
        res,
      });
    }
    if (!getCategoryById) {
      return response({
        statusCode: 404,
        message: `Cannot find category with id ${category_id}, category doesn't exist`,
        res,
      });
    }
    return response({
      statusCode: 200,
      message: "Successfully find category",
      data: getCategoryById,
      res,
    });
  }
  public async createNewCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { categoryName }: CategoryPayloads = req.body;
    const categorySlug = Slugger({ text: String(categoryName) });
    const currentDate = new Date();
    if (!categoryName) {
      return response({
        statusCode: 400,
        message: "Payload cannot be null.",
        res,
      });
    }
    try {
      const newCategory = await prisma.categories.create({
        data: {
          category_name: categoryName,
          category_slug: categorySlug,
          created_at: currentDate,
        },
      });
      return response({
        statusCode: 201,
        message: "New category successfully created.",
        data: newCategory,
        res,
      });
    } catch (error: any) {
      return response({
        statusCode: 500,
        message: error.message,
        res,
      });
    }
  }
}

export default new CategoryControllers();
