import * as bcrypt from "bcryptjs";
type HashParams = {
  text: string;
};

const hash = async ({ text }: HashParams): Promise<string> => {
  const hashText = await bcrypt.hash(text, 10);
  return hashText;
};

export default hash;
