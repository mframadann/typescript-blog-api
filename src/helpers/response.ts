import { Response } from "express";
type ResponseParams = {
  statusCode: number;
  message?: string;
  data?: any;
  res: Response;
};

const response = ({
  statusCode,
  message,
  data,
  res,
}: ResponseParams): Response => {
  return res.status(statusCode).json({
    responses: {
      message,
      data,
    },
  });
};

export default response;
