import {app} from "./app";
import { connectDB } from "./config/connect-db";
import { UserCreationSubscriber } from "./events/subscriber/user-creation-subscriber";
import { rabbitMQWrapper } from "./rabbitMQ-wrapper";

const initializeServices = async () => {
    await connectDB();

    if(!process.env.RABBITMQ_URL) {
        throw  new Error("RABBITMQ_URL must be defined!")
    }
    if(!process.env.RABBITMQ_USER) {
        throw  new Error("RABBITMQ_USER must be defined!")
    }
    if(!process.env.RABBITMQ_PASS) {
        throw  new Error("RABBITMQ_PASS must be defined!")
    }
    if(!process.env.RABBITMQ_PORT) {
        throw  new Error("RABBITMQ_PORT must be defined!")
    }

    await rabbitMQWrapper.connect(process.env.RABBITMQ_URL!, process.env.RABBITMQ_USER!, process.env.RABBITMQ_PASS!, process.env.RABBITMQ_PORT!)

    await new UserCreationSubscriber(rabbitMQWrapper.channel).consume();
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`Boards Service Listening on PORT ${process.env.PORT || 3000}`);
    initializeServices();
})