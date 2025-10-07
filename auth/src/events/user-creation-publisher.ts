import { BasePublisher, UserCreatedEvent, Routingkey, Exchange } from "@rpticketsproject/task-managing-common";
import amqp from "amqplib";

export class UserCreationPublisher extends BasePublisher<UserCreatedEvent> {
    routeKey: Routingkey.userCreated = Routingkey.userCreated;
    exchange: Exchange.user = Exchange.user;
}

// const startPublisher = async () => {
//     try {
//         console.log('start')
//         const conn = await amqp.connect("amqp://guest:guest@localhost:5672");
//         console.log('connected')
//         const channel = await conn.createChannel();
//         const userPublisher = new UserCreationPublisher(channel);
//         await userPublisher.init();
//         await userPublisher.publish({id: "aedadawdawda", email: 'rohanpagare7599@gmail.com'})
//     }catch(e) {
//         console.log('----> ', e)
//     }
// }

// startPublisher();
