import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import {
  errorHandler,
  NotFoundError,
} from "@rpticketsproject/task-managing-common";
import { boardUserRouter } from "./routes/users/get-all-users";
import { boardCreateRouter } from "./routes/board/create-board";
import { boardGetallRouter } from "./routes/board/get-all-board";
import { UserAccessRouter } from "./routes/users/user-can-access-board";
import { createListRouter } from "./routes/list/create-list";
import { boardUpdateRouter } from "./routes/board/update-board";
import { updateListRouter } from "./routes/list/update-list";
import { createCardRouter } from "./routes/card/create-card";
import { updateUserToBoardRouter } from "./routes/users/upadate-user-in-board";
import { addUserToBoardRouter } from "./routes/users/add-user-to-board";
import { acceptUserToBoardRouter } from "./routes/users/accept-user-to-board";
import { boardGetDetailsRouter } from "./routes/board/get-board-details";

dotenv.config();

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(
  cookieSession({
    signed: true,
    secure: process.env.NODE_ENV !== "dev",
    keys: [process.env.COK_KEY as string],
  })
);

// board routers
app.use(boardUpdateRouter);
app.use(boardCreateRouter);
app.use(boardGetallRouter);
app.use(boardGetDetailsRouter)

// list routers
app.use(createListRouter);
app.use(updateListRouter);

// card routers
app.use(createCardRouter);

// user routers
app.use(boardUserRouter);
app.use(UserAccessRouter);
app.use(addUserToBoardRouter);
app.use(updateUserToBoardRouter);
app.use(acceptUserToBoardRouter);


app.use("/api/board/testing", (req, res) => {
  res
    .status(200)
    .send({ message: "Success", res: "aaaa" + process.env.NODE_ENV });
});

app.use("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
