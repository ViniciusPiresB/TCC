import { Whatsapp } from "venom-bot";

export class generalAssessment {
  venomClient: Whatsapp;
  to: string;

  constructor(venomClient: Whatsapp) {
    this.venomClient = venomClient;
    this.to = "";
  }

  public handle(to: string) {
    this.to = to;
  }

  public sendFirstMessage() {
    const firstMessage = "Poggers poggers poggers 1";

    this.sendMessage(firstMessage);
  }

  public sendSecondMessage() {
    const secondMessage = "Poggers poggers poggers 2";

    this.sendMessage(secondMessage);
  }

  private sendMessage(message: string) {
    if (!this.to) return;

    this.venomClient.sendText(this.to, message);
  }

  public setTo(to: string) {
    this.to = to;
  }
}
