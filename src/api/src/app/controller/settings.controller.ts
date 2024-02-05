import { Request, Response } from "express";
import { settingsService } from "../service/settings.service";
import { SettingsDto } from "../dtos/settings.dto";

export class SettingsController {
  public getSettings(req: Request, res: Response) {
    const serviceResponse = settingsService.getSettings();

    res.status(200).send(serviceResponse);
  }

  public setSettings(req: Request, res: Response) {
    const settings: SettingsDto = req.body;

    const serviceResponse = settingsService.setSettings(settings);

    res.status(200).send(serviceResponse);
  }
}
