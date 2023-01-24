import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { response } from "../../helpers";
import userControllers from "../users/userControllers";
import { PostPayloads, PostQueryParams } from "./types/index";

const prisma = new PrismaClient();
class PostControllers {
  public async getAllPosts(req: Request, res: Response): Promise<Response> {
    const allPosts = await prisma.posts.findMany({
      where: {
        post_published: true,
      },
      include: {
        user: {
          select: {
            user_id: true,
            email: true,
            profile: true,
          },
        },
        categories: {
          include: {
            categories: {
              select: {
                category_name: true,
                category_slug: true,
              },
            },
          },
        },
        media: true,
      },
    });
    const resultSets = allPosts.map((post): {} => {
      return {
        ...post,
        user: {
          ...post.user.profile,
          email: post.user.email,
        },
        categories: post.categories.map((category) => category.categories),
      };
    });
    return response({
      statusCode: 200,
      message: "Successfully get posts data",
      data: resultSets,
      res,
    });
  }
  public async getPostById(req: Request, res: Response): Promise<Response> {
    const { post_id }: PostQueryParams = req.query;
    const findPost = await prisma.posts.findUnique({
      where: {
        post_id: Number(post_id),
      },
      include: {
        user: {
          select: {
            email: true,
            profile: true,
          },
        },
        categories: {
          select: {
            categories: {
              select: {
                category_id: true,
                category_name: true,
                category_slug: true,
              },
            },
          },
        },
      },
    });
    const postData = {
      ...findPost,
      user: {
        email: findPost?.user.email,
        ...findPost?.user.profile,
      },
      categories: findPost?.categories.map((category) => category.categories),
    };
    return response({
      statusCode: 200,
      data: postData,
      res,
    });
  }

  public async createNewPosts(req: Request, res: Response): Promise<Response> {
    const categories: any[] = [];
    const currentDate: Date = new Date();
    const {
      postTitle,
      postContent,
      categoryIds,
      postPublished,
      userId,
      mediaId,
    }: PostPayloads = req.body;
    const postExcerpt: string = postContent.slice(0, 50);
    const postSlug: string = postTitle.replace(/ /g, "-").toLowerCase();
    [...categoryIds].map((categoryId): void => {
      categories.push({
        category_id: Number(categoryId),
      });
    });
    if (
      !postTitle ||
      !postSlug ||
      !postContent ||
      !postExcerpt ||
      !userId ||
      !categoryIds
    ) {
      return response({
        statusCode: 400,
        message: "Payload cannot be null or undefined. please try again",
        res,
      });
    }
    try {
      const newPost = await prisma.posts.create({
        data: {
          user_id: Number(userId),
          post_title: postTitle,
          post_slug: postSlug,
          post_excerpt: postExcerpt,
          post_content: postContent,
          post_created: currentDate,
          post_last_updated: currentDate,
          post_published: Boolean(postPublished),
          media_id: mediaId ?? null,
          categories: {
            create: categories,
          },
        },
      });
      return response({
        statusCode: 201,
        message: "New post successfully created",
        data: newPost,
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

  public async updatePost(req: Request, res: Response): Promise<Response> {
    return response({
      statusCode: 201,
      message: "New post successfully created",
      data: [],
      res,
    });
  }
}

export default new PostControllers();
