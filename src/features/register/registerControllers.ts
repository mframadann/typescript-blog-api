import { Request, Response } from "express";
import { response } from "../../helpers";

class RegisterControllers {
  public async createNewUser(req: Request, res: Response): Promise<Response> {
    return response({
      message: "Is works",
      statusCode: 200,
      data: [{ name: "Ramadan" }],
      res,
    });
  }
}

export default new RegisterControllers();
