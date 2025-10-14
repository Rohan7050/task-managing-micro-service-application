import {
  BadRequestError,
  validateRequest,
} from "@rpticketsproject/task-managing-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { UserBoardAccess } from "../../model/user-board-rel";

const router = express.Router();

router.post(
  "/api/board/user/accept",
  [
    body("userId").isString().isUUID().withMessage("Invalid User Id."),
    body("board").isMongoId().withMessage("Invalid Board Id."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { userId, board, accessType } = req.body;
      const userRel = await UserBoardAccess.findOne({
        user: userId,
        board: board,
      });
      if (!userRel) {
        throw new BadRequestError("user don't have access to board");
      }
      userRel.accept = true;
      await userRel.save();
      // trigger mail event to send mail to user that will capture in mail service
      return res.status(201).send({ message: "success", data: userRel });
    } catch (e) {
      console.log(e);
      throw new BadRequestError("unable to create boaed.");
    }
  }
);

export { router as acceptUserToBoardRouter };
