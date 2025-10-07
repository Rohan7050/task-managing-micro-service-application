import amqp, { Channel, ConsumeMessage } from "amqplib";

class RabbitMQWrapper {
  private _channel: Channel | undefined;

  get channel(): Channel {
    if (!this._channel) {
      throw new Error("cannot access NATS client before connecting");
    }
    return this._channel;
  }

  async connect(url: string, user: string, password: string, port: string) {
    try {
      const connectionUrl = `amqp://${user}:${password}@${url}:${port}`;
      const conn = await amqp.connect(connectionUrl);
      console.log("connected to rabbitMQ");
      this._channel = await conn.createChannel();
      console.log("rabbitMQ channel created");
    } catch (e) {
      throw e;
    }
  }
}

export const rabbitMQWrapper = new RabbitMQWrapper();
