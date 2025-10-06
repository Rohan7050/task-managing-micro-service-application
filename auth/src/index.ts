import {app} from "./app";
import { AppDataSource } from "./config/data-source";

const initializeServices = async () => {
    await AppDataSource.initialize();
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on PORT ${process.env.PORT || 3000}`);
    initializeServices().then(() => {
        console.log("Database Connected")
    }).catch((e: Error) => {
        console.log('error: ' + e.message);
    })
})