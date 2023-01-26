import { Request, Response } from "express";
import { BytesFormat, response } from "../../helpers";
import { MediaPayloads } from "./types/index";

class MediaControllers {
  public async uploadNewMedia(req: Request, res: Response): Promise<Response> {
    const payloads: MediaPayloads = {
      mediaUrl: `${process.env.BASE_URL}/tmp/${req.file?.filename}`,
      originalName: req.file?.originalname,
      mediaName: req.file?.filename,
      mediaMimeType: req.file?.mimetype,
      mediaPath: req.file?.path,
      mediaSize: BytesFormat({ bytes: Number(req.file?.size), decimals: 2 }),
    };
    return response({
      statusCode: 201,
      message: "Successfully upload new media.",
      data: payloads,
      res,
    });
  }
}

export default new MediaControllers();
