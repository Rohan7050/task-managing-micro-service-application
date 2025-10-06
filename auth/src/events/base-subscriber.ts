import { Channel, ConsumeMessage } from "amqplib";

export abstract class BaseListener {
  abstract exchange: string;
  abstract onMessage(data: any, msg: ConsumeMessage, channel: Channel): Promise<void>;
  protected channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async consume() {
    await this.channel.assertExchange(this.exchange, "fanout", {
      durable: true,
    });
    const q = await this.channel.assertQueue("", { exclusive: true });
    this.channel.bindQueue(q.queue, this.exchange, "");
    this.channel.consume(
      q.queue,
      async (msg) => {
        if (!msg) return;
        try {
          const data = JSON.parse(msg.content.toString());
          await this.onMessage(data, msg, this.channel);
        } catch (err) {
          console.error("Failed to process message:", err);
        }
      },
      { noAck: false }
    );
  }
}
