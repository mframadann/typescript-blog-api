import { Request, Response } from "express";
import { response } from "../../helpers";

class PostControllers {
  public async getAllPosts(req: Request, res: Response): Promise<Response> {
    return response({
      statusCode: 200,
      message: "Successfully get posts data",
      res,
    });
  }
}

export default new PostControllers();
