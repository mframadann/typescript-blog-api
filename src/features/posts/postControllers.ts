import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { response } from "../../helpers";
import { PostPayloads } from "./types/index";

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
        media: true,
      },
    });
    return response({
      statusCode: 200,
      message: "Successfully get posts data",
      data: allPosts,
      res,
    });
  }

  public async createNewPosts(req: Request, res: Response): Promise<Response> {
    const {
      postTitle,
      postContent,
      categoryIds,
      postPublished,
      userId,
      mediaId,
    }: PostPayloads = req.body;
    const currentDate: Date = new Date();
    const postExcerpt: string = postContent.substring(0, 30);
    const postSlug: string = postTitle.replace(/ /g, "-").toLowerCase();
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
          post_excerpt: postContent,
          post_content: postContent,
          post_created: currentDate,
          post_last_updated: currentDate,
          post_published: Boolean(postPublished),
          media_id: mediaId ?? null,
        },
      });
      await prisma.posts.update({
        where: {
          post_id: newPost.post_id,
        },
        data: {
          categories: {
            set: [
              {
                post_id_category_id: {
                  category_id: Number(categoryIds),
                  post_id: newPost.post_id,
                },
              },
            ],
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
      console.log(error.message);

      return response({
        statusCode: 500,
        message: error.message,
        res,
      });
    }
  }
}

export default new PostControllers();
