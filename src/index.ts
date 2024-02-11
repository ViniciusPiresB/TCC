import { create } from "venom-bot";
import ChatGPT from "./modules/chatGpt";
import { updateSettings } from "./helper/updateSettings";
import { getSettings } from "./helper/getSettings";
import { checkIfHasNumber } from "./helper/checkNumber";
import { NumberAvDTO } from "./dto/numberAv.dto";
import { addAssessment } from "./helper/addAvaliation";
import { QuantityMessage } from "./dto/qMessages.dto";

const allEvaluations: NumberAvDTO = {};
const allQuantityMessages: QuantityMessage = {};

(async () => {
  const venomClient = await create({
    session: "test",
    disableWelcome: true
  });

  const settings = await getSettings();

  const canAnswerGroup = settings.canAnswerGroup;

  const chatGpt = new ChatGPT();

  venomClient.onMessage(async (message) => {
    const start = performance.now();

    if (!message.body || message.from == "status@broadcast") return;

    if (message.from == "556292342844@c.us") return;

    if (!canAnswerGroup) {
      if (message.isGroupMsg) return;
    }

    if (message.body.length <= 10 && checkIfHasNumber(message.body)) {
      if (!allEvaluations[message.from]) allEvaluations[message.from] = [];

      const numberAvs = allEvaluations[message.from];

      const messagePattern = message.body.match(/\d+/);

      if (!messagePattern || !messagePattern[0]) return;

      const valAssessment = parseInt(messagePattern[0]);

      console.log(allEvaluations);

      addAssessment(valAssessment, numberAvs);

      const lastIndexOfAv = numberAvs.length - 1;
      const lastAv = numberAvs[lastIndexOfAv];

      if (lastAv["av2"] == -1) {
        venomClient.sendText(
          message.from,
          "Em uma escala de 0 a 5, avalie o quanto a resposta foi esclarecedora."
        );
      }

      return;
    }

    const responseGpt = await chatGpt.completion(message.body, message.from);

    if (!responseGpt) return;

    await venomClient.sendText(message.from, responseGpt);

    venomClient.sendText(
      message.from,
      "Em uma escala de 0 a 5, avalie o nivel de satisfação da resposta obtida."
    );

    const stop = performance.now();
    const inSeconds = Number(Number((stop - start) / 1000).toFixed(2));

    updateSettings(inSeconds);
  });
})();
