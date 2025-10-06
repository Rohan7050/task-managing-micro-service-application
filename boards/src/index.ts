import {app} from "./app";
import { connectDB } from "./config/connect-db";

const initializeServices = async () => {
    await connectDB();
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`Boards Service Listening on PORT ${process.env.PORT || 3000}`);
    initializeServices();
})