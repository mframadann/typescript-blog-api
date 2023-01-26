import { Response } from "express";
type ResponseParams<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  res: Response;
};

const response = <T>({
  statusCode,
  message,
  data,
  res,
}: ResponseParams<T>): Response => {
  return res.status(statusCode).json({
    message,
    data,
  });
};

export default response;
