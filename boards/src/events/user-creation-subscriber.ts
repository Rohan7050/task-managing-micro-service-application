import { BaseSubscriber, UserCreatedEvent, Routingkey, Exchange } from "@rpticketsproject/task-managing-common";
import { Channel, ConsumeMessage } from "amqplib";

export class UserCreationSubscriber extends BaseSubscriber<UserCreatedEvent> {
    routeKey: Routingkey.userCreated = Routingkey.userCreated;
    exchange: Exchange.user = Exchange.user;
    async onMessage(data: any, msg: ConsumeMessage, channel: Channel): Promise<void> {
        console.log('======> ', data);
        channel.ack(msg);
    }   
}

// const startSubscriber = async () => {
//     try {
//         console.log('start')
//         const conn = await amqp.connect("amqp://guest:guest@localhost:5672");
//         const channel = await conn.createChannel();
//         const userSubscriber = new UserCreationSubscriber(channel);
//         await userSubscriber.consume();
//     }catch(e) {
//         console.log('----> ', e)
//     }
// }

// startSubscriber();