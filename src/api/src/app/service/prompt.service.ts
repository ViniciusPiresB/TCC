import { PdfDocument } from "@ironsoftware/ironpdf";
import * as fs from "fs";

export class promptService {
  public static getPrompt() {
    const prompt = fs.readFileSync("./src/prompt.txt", "utf-8");

    const promptList = prompt.split("\n\n\n");

    return promptList;
  }

  public static async setPrompt(prompt: string) {
    const pdf = await PdfDocument.open("./src/input.pdf");

    const text = await pdf.extractText();

    fs.writeFileSync("./src/prompt.txt", prompt + "\n\n\n" + text);

    return { message: "success" };
  }
}
