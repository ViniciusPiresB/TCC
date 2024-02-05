import * as fs from "fs";
import { SettingsDto } from "../dtos/settings.dto";

export class settingsService {
  public static getSettings() {
    const settings = fs.readFileSync("./src/settings.json", "utf-8");

    const settingsJson = JSON.parse(settings);

    return settingsJson;
  }

  public static setSettings(settings: SettingsDto) {
    const settingsString = JSON.stringify(settings);

    fs.writeFileSync("./src/settings.json", settingsString);

    return { message: "success" };
  }
}
