import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { response, Slugger } from "../../helpers";
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
            category: {
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
          ...post.user?.profile,
          email: post.user?.email,
        },
        categories: post.categories.map((category) => category.category),
      };
    });
    return response({
      statusCode: 200,
      message: "Successfully get posts data",
      data: resultSets,
      res,
    });
  }
  public async getPostById<T>(req: Request, res: Response): Promise<Response> {
    const { post_id }: PostQueryParams<T> = req.query;
    const getPost = await prisma.posts.findUnique({
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
            category: {
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
    if (!getPost) {
      return response({
        statusCode: 404,
        message: `Cannot find post with id ${post_id}`,
        res,
      });
    }
    const postData = {
      ...getPost,
      user: {
        email: getPost.user?.email,
        ...getPost.user?.profile,
      },
      categories: getPost?.categories.map((category) => category.category),
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
    const postSlug: string = Slugger({ text: postTitle });
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
  public async updatePost<T>(req: Request, res: Response): Promise<Response> {
    const categories: any[] = [];
    const { post_id }: PostQueryParams<T> = req.query;
    const {
      postTitle,
      postContent,
      categoryIds,
      postPublished,
      mediaId,
    }: PostPayloads = req.body;
    const postExcerpt: string = postContent.slice(0, 50);
    const postSlug: string = Slugger({ text: postTitle });
    [...categoryIds].map((categoryId): void => {
      categories.push({
        category_id: Number(categoryId),
      });
    });
    const postIsExist = await prisma.posts.count({
      where: {
        post_id: Number(post_id),
      },
    });
    if (!postIsExist) {
      return response({
        statusCode: 404,
        message: `Cannot find post with id ${post_id}, try again`,
        res,
      });
    }
    if (
      !postTitle ||
      !postSlug ||
      !postContent ||
      !postExcerpt ||
      !categoryIds
    ) {
      return response({
        statusCode: 400,
        message: "Payload cannot be null or undefined. please try again",
        res,
      });
    }
    try {
      const updatedPost = await prisma.posts.update({
        where: {
          post_id: Number(post_id),
        },
        data: {
          post_title: postTitle,
          post_slug: postSlug,
          post_excerpt: postExcerpt,
          post_content: postContent,
          post_published: Boolean(postPublished),
          media_id: mediaId ?? null,
          categories: {
            deleteMany: {
              post_id: Number(post_id),
            },
            create: categories,
          },
        },
      });
      return response({
        statusCode: 200,
        message: `Post with id ${post_id} successfully updated.`,
        res,
      });
    } catch (error: any) {
      return response({
        statusCode: 201,
        message: error.message,
        res,
      });
    }
  }
  public async deletePosts<T>(req: Request, res: Response): Promise<Response> {
    const { post_id }: PostQueryParams<T> = req.query;
    const postExist = await prisma.posts.count({
      where: { post_id: Number(post_id) },
    });
    if (!postExist) {
      return response({
        statusCode: 404,
        message: `Cannot delete post with id ${post_id}, post doesn't exist`,
        res,
      });
    }
    try {
      await prisma.posts.delete({
        where: {
          post_id: Number(post_id),
        },
      });
      return response({
        statusCode: 200,
        message: `Successfully deleted post with id ${post_id}`,
        res,
      });
    } catch (error: any) {
      return response({
        statusCode: 200,
        message: error.message,
        res,
      });
    }
  }
}

export default new PostControllers();
