import { BaseSubscriber, UserCreatedEvent, Routingkey, Exchange } from "@rpticketsproject/task-managing-common";
import { Channel, ConsumeMessage } from "amqplib";
import { User } from "../../model/user";

export class UserCreationSubscriber extends BaseSubscriber<UserCreatedEvent> {
    routeKey: Routingkey.userCreated = Routingkey.userCreated;
    exchange: Exchange.user = Exchange.user;
    async onMessage(data: UserCreatedEvent['data'], msg: ConsumeMessage, channel: Channel): Promise<void> {
        console.log('======> ', data);
        const {id, email} = data;
        const isUserExist = await User.findOne({email});
        if(isUserExist) {
            channel.ack(msg);
            return;
        }
        const user = User.build({
            id, email
        });
        await user.save();
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