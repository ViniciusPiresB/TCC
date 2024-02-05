import { Request, Response } from "express";
import { promptService } from "../service/prompt.service";

export class PromptController {
  public getPrompt(req: Request, res: Response) {
    const serviceResponse = promptService.getPrompt();

    res.status(200).send(serviceResponse);
  }

  public async setPrompt(req: Request, res: Response) {
    const { prompt } = req.body;

    console.log(prompt);

    const serviceResponse = await promptService.setPrompt(prompt);

    res.status(200).send(serviceResponse);
  }
}
