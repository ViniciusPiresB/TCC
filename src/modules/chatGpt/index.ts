import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { getOpenAiApi } from "./config/getOpenAiApi";
import { getPrompt } from "./prompts/prompt";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export default class ChatGPT {
  openAI: OpenAIApi;
  messages: { [messageFrom: string]: ChatCompletionRequestMessage[] } = {};
  genAI = new GoogleGenerativeAI("AIzaSyANKQU2Jb7sxFz-KEFIQmgG7iO3evbrzOE");
  model: GenerativeModel;

  constructor() {
    const openAiApi = getOpenAiApi();
    this.openAI = openAiApi;
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async completion(messageContent: string, messageFrom: string) {
    await this.checkFirstMessage(messageFrom);

    const message: ChatCompletionRequestMessage = {
      role: "user",
      content: messageContent
    };

    console.log("mess");
    console.log(messageContent);
    const messages = this.setMessage(message, messageFrom);
    const promptStart = await getPrompt();
    messageContent =
      promptStart +
      "\nResponda a seguinte pergunta com base nas informações adicionadas acima: " +
      messageContent;

    console.log(messageContent);
    const result = await this.model.generateContent(messageContent);
    const response = await result.response;
    const gptResponse = response.text();

    /*const completion = await this.openAI.createChatCompletion({
      model: "gpt-3.5-turbo-0125",
      temperature: 0,
      max_tokens: 512,
      messages
    });*/

    // const gptResponse = completion.data.choices[0].message;

    if (!gptResponse) throw new Error("Error on chatgpt response!");

    const assistantResponse: ChatCompletionRequestMessage = {
      role: "user",
      content: gptResponse
    };

    this.setMessage(assistantResponse, messageFrom);
    console.log(messages);

    return gptResponse;
  }

  setMessage(message: ChatCompletionRequestMessage, messageFrom: string) {
    const messages = this.messages[messageFrom];

    if (!messages) this.messages[messageFrom] = [];

    this.messages[messageFrom].push(message);

    return this.messages[messageFrom];
  }

  async checkFirstMessage(messageFrom: string) {
    const messages = this.messages[messageFrom];

    if (messages) return;

    const initPrompt = await getPrompt();
    console.log(initPrompt);
    for (const text of initPrompt) {
      const message: ChatCompletionRequestMessage = {
        role: "system",
        content: text
      };

      this.setMessage(message, messageFrom);
    }
  }
}
