import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

export const getOpenAiApi = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  const configuration = new Configuration({
    apiKey
  });

  const openAI = new OpenAIApi(configuration);

  return openAI;
};
