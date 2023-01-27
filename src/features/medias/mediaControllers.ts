import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BytesFormat, response } from "../../helpers";
import { MediaPayloads } from "./types/index";

const prisma = new PrismaClient();
class MediaControllers {
  public async uploadNewMedia(req: Request, res: Response): Promise<Response> {
    const currentDate = new Date();
    const payloads: MediaPayloads = {
      mediaUrl: `${process.env.BASE_URL}/tmp/${req.file?.filename}`,
      originalName: req.file?.originalname,
      mediaName: req.file?.filename,
      mediaMimeType: req.file?.mimetype,
      mediaPath: req.file?.path,
      mediaSize: BytesFormat({ bytes: Number(req.file?.size), decimals: 2 }),
      uploadedAt: currentDate,
    };
    if (!req.file) {
      return response({
        statusCode: 400,
        message: "Canot upload new media, file payload must be provided.",
        res,
      });
    }
    try {
      const newMedia = await prisma.medias.create({
        data: {
          media_original_name: String(payloads.originalName),
          media_name: String(payloads.mediaName),
          media_path: String(payloads.mediaPath),
          media_mimetype: String(payloads.mediaMimeType),
          media_url: String(payloads.mediaUrl),
          media_size: String(payloads.mediaSize),
          uploaded_at: payloads.uploadedAt,
        },
      });
      return response({
        statusCode: 201,
        message: "Successfully upload new media.",
        data: newMedia,
        res,
      });
    } catch (error: any) {
      return response({
        statusCode: 500,
        message: JSON.stringify(error.message),
        res,
      });
    }
  }
}

export default new MediaControllers();
