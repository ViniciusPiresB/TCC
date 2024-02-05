import { Router } from "express";
import { PromptController } from "../controller/prompt.controller";

const promptRouter = Router();
const promptController = new PromptController();

promptRouter.get("/", promptController.getPrompt);
promptRouter.post("/", promptController.setPrompt);

export { promptRouter };
