import { create } from "venom-bot";
import ChatGPT from "./modules/chatGpt";
import { updateSettings } from "./helper/updateSettings";
import { getSettings } from "./helper/getSettings";
import { checkIfHasNumber } from "./helper/checkNumber";
import { NumberAvDTO } from "./dto/numberAv.dto";
import { addAssessment } from "./helper/addAvaliation";

const allEvaluations: NumberAvDTO = {};

(async () => {
  const venomClient = await create({
    session: "test",
    disableWelcome: true
  });

  const settings = await getSettings();

  const canAnswerGroup = settings.canAnswerGroup;

  const chatGpt = new ChatGPT();

  venomClient.onMessage(async message => {
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

      addAssessment(valAssessment, numberAvs);

      console.log(allEvaluations);
      return;
    }

    const responseGpt = await chatGpt.completion(message.body, message.from);

    if (!responseGpt) return;

    venomClient.sendText(message.from, responseGpt);

    const stop = performance.now();
    const inSeconds = Number(Number((stop - start) / 1000).toFixed(2));

    updateSettings(inSeconds);
  });
})();
