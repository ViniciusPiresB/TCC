import { Message, Whatsapp } from "venom-bot";
import ChatGPT from "../chatGpt";
import { checkIfHasNumber } from "../../helper/checkNumber";
import { NumberAvDTO } from "../../dto/numberAv.dto";
import { addAssessment } from "../../helper/addAvaliation";

export class GeneralAssessment {
  venomClient: Whatsapp;
  chatGpt: ChatGPT;
  to: string;

  constructor(venomClient: Whatsapp, chatGpt: ChatGPT) {
    this.venomClient = venomClient;
    this.chatGpt = chatGpt;
    this.to = "";
  }

  public async handle(message: Message, allEvaluations: NumberAvDTO) {
    this.to = message.from;

    if (message.body.length <= 10 && checkIfHasNumber(message.body)) {
      return this.handleNumberMessage(message, allEvaluations);
    }

    const responseGpt = await this.chatGpt.completion(
      message.body,
      message.from
    );

    if (!responseGpt) return;

    await this.venomClient.sendText(message.from, responseGpt);

    this.sendFirstMessage();

    return;
  }

  private async handleNumberMessage(
    message: Message,
    allEvaluations: NumberAvDTO
  ) {
    const messagePattern = message.body.match(/\d+/);

    if (!messagePattern || !messagePattern[0]) return;

    const valAssessment = parseInt(messagePattern[0]);

    const numberAvs = allEvaluations[message.from];
    console.log(allEvaluations);

    try {
      if (numberAvs[4].av1 != -1 && numberAvs[4].av2 == -1) {
        addAssessment(valAssessment, numberAvs);
        console.log(numberAvs[5]);
        await this.sendFirstGeneralMessage();
        return;
      }
    } catch (error) {
      if (error instanceof TypeError) console.log("avs not found, normal");
      else throw error;
    }

    if (numberAvs.length == 5 && numberAvs[4].av2 != -1) {
      addAssessment(valAssessment, numberAvs);

      await this.sendSecondGeneralMessage();

      return;
      // segunda av esta preenchido
      // TODO: Criar estrutura de armazenamento avaliacao geral e continuar o fluxo a partir do (A segunda avaliação está preenchida?)
    }

    addAssessment(valAssessment, numberAvs);

    if (numberAvs.length == 6 && numberAvs[5].av2 != -1) {
      return true;
    }

    await this.sendSecondMessage();
  }

  private async sendFirstMessage() {
    const firstMessage =
      "Em uma escala de 0 a 5, avalie o nivel de satisfação da resposta obtida.";

    this.sendMessage(firstMessage);
  }

  private async sendSecondMessage() {
    const secondMessage =
      "Em uma escala de 0 a 5, avalie o quanto a resposta foi esclarecedora.";

    this.sendMessage(secondMessage);
  }

  private async sendFirstGeneralMessage() {
    const firstGeneralMessage =
      "De 0 a 5, classifique se você considera que essa ferramenta economiza tempo?";

    this.sendMessage(firstGeneralMessage);
  }

  private async sendSecondGeneralMessage() {
    const secondGeneralMessage =
      "De 0 a 5, quais as chances de você utilizar essa ferramenta no futuro?";

    this.sendMessage(secondGeneralMessage);
  }

  private sendMessage(message: string) {
    if (!this.to) return;

    this.venomClient.sendText(this.to, message);
  }
}
