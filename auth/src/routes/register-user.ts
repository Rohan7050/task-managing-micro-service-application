import express, { Request, Response } from "express";
import { User } from "../entity/user-entity";
import { JWTToken } from "../services/jwt";
import { AppDataSource } from "../config/data-source";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@rpticketsproject/task-managing-common";
import { UserCreationPublisher } from "../events/user-creation-publisher";
import { rabbitMQWrapper } from "../rabbitMQ-wrapper";

const router = express.Router();

router.post("/api/user/register", [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password").isLength({max: 20, min: 4}).withMessage("password must be between 4 to 20 charactors"),
    body("firstname").isString().isLength({max: 20, min: 4}).withMessage("first name must be between 4 to 20 charactors"),
    body("lastname").isString().isLength({max: 20, min: 4}).withMessage("last name must be between 4 to 20 charactors")
], validateRequest, async (req: Request, res: Response) => {
  const { email, password, firstname, lastname } = req.body;
  const userRepository = AppDataSource.getRepository(User)
  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) {
    throw new BadRequestError("email already exists!");
  }

  const user = new User();
  user.email = email;
  user.password = password;
  user.firstname = firstname;
  user.lastname = lastname;

  const newUser = await userRepository.save(user);
  // emit event of user creation
  const userPublisher = new UserCreationPublisher(rabbitMQWrapper.channel);
  await userPublisher.init();
  userPublisher.publish({id: newUser.id, email: newUser.email})
  const userJwt = JWTToken.create(
    newUser.id,
    newUser.email,
    process.env.JWT_KEY || "mamdawmdawdmad"
  );

  req.session = {
    jwt: userJwt,
  };

  return res.status(201).send({ message: "success" });
});

export { router as registerUserRouter };
