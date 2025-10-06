import express, { Request, Response } from "express";
import { User } from "../entity/user-entity";
import { JWTToken } from "../services/jwt";
import { AppDataSource } from "../config/data-source";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@rpticketsproject/task-managing-common";

const router = express.Router();

router.post("/api/user/register", [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password").isLength({max: 20, min: 4}).withMessage("password must be between 4 to 20 charactors")
], validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User)
  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) {
    throw new BadRequestError("email already exists!");
  }

  const user = new User();
  user.email = email;
  user.password = password;

  const newUser = await userRepository.save(user);

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
