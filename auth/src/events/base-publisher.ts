import { Channel, ConsumeMessage } from "amqplib";

export abstract class BasePublisher {
    abstract exchange: string;
    protected channel: Channel;

    constructor(channel: Channel) {
        this.channel = channel
    }

    async init() {
        await this.channel.assertExchange(this.exchange, "fanout", { durable: true });
    }

    publish(data: any) {
        return new Promise((resolve, reject) => {
            this.channel.publish(this.exchange, '', Buffer.from(JSON.stringify(data)))
        })
    }

}