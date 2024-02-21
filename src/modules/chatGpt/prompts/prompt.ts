import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export const getPrompt = async () => {
  const baseURL = process.env.API_URL;

  const request = await axios.get(`${baseURL}/prompt`);

  if (request.status != 200) throw new Error("Error on getPrompt request");

  const response = request.data;

  const prompt: string[] = response;

  let fullText = "";

  prompt.forEach(text => {
    fullText += text + "\n";
  });

  return fullText;
};
