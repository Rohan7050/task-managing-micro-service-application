import express, { Request, Response } from "express";
import { User } from "../entity/user-entity";
import { body } from "express-validator";
import { AppDataSource } from "../config/data-source";
import { BadRequestError, validateRequest } from "@rpticketsproject/task-managing-common";
import { JWTToken } from "../services/jwt";

const router = express.Router();

router.post(
  "/api/user/login",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .isLength({ max: 20, min: 4 })
      .withMessage("password must be between 4 to 20 charactors"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestError("User not found");
    }
    if (!(await user.comparePassword(password))) {
      throw new BadRequestError("Please enter correct password");
    }
    const userJwt = JWTToken.create(
      user.id,
      user.email,
      process.env.JWT_KEY || "mamdawmdawdmad"
    );

    req.session = {
      jwt: userJwt,
    };
    return res.status(201).send({ message: "success" });
  }
);

export {router as loginRouter}
