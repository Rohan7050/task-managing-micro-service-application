import {app} from "./app";
import { AppDataSource } from "./config/data-source";
import amqp, { Channel, ChannelModel } from "amqplib";

const initializeServices = async () => {
    await AppDataSource.initialize();

    // const conn: ChannelModel = await amqp.connect(process.env.RABBITMQ_URL!);
    // const channel: Channel = await conn.createChannel();
    // const exchange = "user_events";
    // await channel.assertExchange(exchange, "fanout", { durable: true });
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`Auth Service Listening on PORT ${process.env.PORT || 3000}`);
    initializeServices().then(() => {
        console.log("Database Connected")
    }).catch((e: Error) => {
        console.log('error: ' + e.message);
    })
})