import { Router } from "express";
import { SettingsController } from "../controller/settings.controller";

const settingsRouter = Router();
const settingsController = new SettingsController();

settingsRouter.get("/", settingsController.getSettings);
settingsRouter.post("/", settingsController.setSettings);

export { settingsRouter };
