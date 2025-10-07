import {app} from "./app";
import { AppDataSource } from "./config/data-source";
import amqp, { Channel, ChannelModel } from "amqplib";
import { rabbitMQWrapper } from "./rabbitMQ-wrapper";

const initializeServices = async () => {
    await AppDataSource.initialize();
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

    // await new UserCreationSubscriber(rabbitMQWrapper.channel).consume();
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`Auth Service Listening on PORT ${process.env.PORT || 3000}`);
    initializeServices().then(() => {
        console.log("Database Connected")
    }).catch((e: Error) => {
        console.log('error: ' + e.message);
    })
})