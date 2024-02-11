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
      this.handleNumberMessage(message, allEvaluations);
      return;
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

    if (numberAvs.length == 5 && numberAvs[4].av1 != -1) {
      // primeira av esta preenchido
      const lastAv = numberAvs[4];

      if (lastAv.av2 == -1) {
        // segunda av nn esta preenchido
        addAssessment(valAssessment, numberAvs);

        await this.sendSecondGeneralMessage();

        return;
      }

      // segunda av esta preenchido
      // TODO: Criar estrutura de armazenamento avaliacao geral e continuar o fluxo a partir do (A segunda avaliação está preenchida?)
    }

    addAssessment(valAssessment, numberAvs);

    await this.sendSecondMessage();
  }

  private async sendFirstMessage() {
    const firstMessage = "Poggers poggers poggers 1";

    this.sendMessage(firstMessage);
  }

  private async sendSecondMessage() {
    const secondMessage = "Poggers poggers poggers 2";

    this.sendMessage(secondMessage);
  }

  private async sendFirstGeneralMessage() {
    const firstGeneralMessage = "Poggers poggers poggers general 1";

    this.sendMessage(firstGeneralMessage);
  }

  private async sendSecondGeneralMessage() {
    const secondGeneralMessage = "Poggers poggers poggers general 2";

    this.sendMessage(secondGeneralMessage);
  }

  private sendMessage(message: string) {
    if (!this.to) return;

    this.venomClient.sendText(this.to, message);
  }
}
