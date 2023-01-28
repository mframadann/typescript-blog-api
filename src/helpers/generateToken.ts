import jwt from "jsonwebtoken";

type CreateTokenPayload<Args> = {
  payload: Args;
  type?: string;
  options?: Args;
};

const createToken = <Args>({
  payload,
  type,
  options,
}: CreateTokenPayload<Args>): string => {
  const { SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;
  switch (type) {
    case "refresh":
      type = String(REFRESH_TOKEN_SECRET_KEY);
      break;
    default:
      type = String(SECRET_KEY);
  }
  const token = jwt.sign({ payload }, type, { ...options });
  return token;
};

export default createToken;
