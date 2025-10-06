import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import dotenv from 'dotenv';
import { errorHandler, NotFoundError } from "@rpticketsproject/task-managing-common";
import { registerUserRouter } from "./routes/register-user";
import { loginRouter } from "./routes/login-user";
import { logoutUserRouter } from "./routes/logout-user";
import { currentUserRouter } from "./routes/current-user";

dotenv.config({
    path: ".env"
});

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(
  cookieSession({
    signed: true,
    secure: process.env.NODE_ENV !== "dev",
    keys: [(process.env.COK_KEY as string)],
  })
);

app.use(registerUserRouter);
app.use(loginRouter);
app.use(logoutUserRouter);
app.use(currentUserRouter)

app.use("/testing", (req, res) => {
  res.status(200).send({ message: "Success", res: "aaaa" + process.env.NODE_ENV });
});

app.use("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
