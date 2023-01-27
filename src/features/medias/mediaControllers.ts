import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BytesFormat, response } from "../../helpers";
import { MediaPayloads, MediaQueryParams } from "./types/index";

const prisma = new PrismaClient();
class MediaControllers {
  public async getAllMedias(req: Request, res: Response): Promise<Response> {
    const allMedias = await prisma.medias.findMany();
    const data: unknown =
      allMedias.length > 0
        ? allMedias
        : "All medias data will be shown here. 0 media found.";
    return response({
      statusCode: 200,
      message: "Successfully get all medias",
      data,
      res,
    });
  }
  public async getMediaById(req: Request, res: Response): Promise<Response> {
    const { media_id }: MediaQueryParams = req.query;
    if (!Number(media_id)) {
      return response({
        statusCode: 400,
        message: `Please insert a valid media id`,
        res,
      });
    }
    const mediaIsExist = await prisma.medias.count({
      where: { media_id: Number(media_id) },
    });
    if (!mediaIsExist) {
      return response({
        statusCode: 404,
        message: `Cannot get media with id ${media_id}, media doesn't exist.`,
        res,
      });
    }
    const getMedia = await prisma.medias.findUnique({
      where: {
        media_id: Number(media_id),
      },
    });
    return response({
      statusCode: 200,
      message: `Successfully get media with id ${media_id}`,
      data: getMedia,
      res,
    });
  }
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
        message: error.message,
        res,
      });
    }
  }
}

export default new MediaControllers();
