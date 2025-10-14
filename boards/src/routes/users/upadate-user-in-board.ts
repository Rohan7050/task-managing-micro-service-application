import {
  BadRequestError,
  currentUser,
  requireAuth,
  validateRequest,
} from "@rpticketsproject/task-managing-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { UserBoardAccess } from "../../model/user-board-rel";

const router = express.Router();

router.post(
  "/api/board/user/update",
  currentUser,
  requireAuth,
  [
    body("userId").isString().isUUID().withMessage("Invalid User Id."),
    body("board").isMongoId().withMessage("Invalid Board Id."),
    body("accessType")
      .isIn(["read", "write"])
      .withMessage("value must be 'read' or 'write'."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { userId, board, accessType } = req.body;
      const rel = await UserBoardAccess.findOne({
        user: req.currentUser!.id,
        board: board,
        accessType: "admin",
      });
      if (!rel) {
        throw new BadRequestError("Invalid req to update user access in board");
      }
      const userRel = await UserBoardAccess.findOne({
        user: userId,
        board: board,
      });
      if (!userRel) {
        throw new BadRequestError("user don't have access to board");
      }
      userRel.accessType = accessType;
      await userRel.save();
      // trigger mail event to send mail to user that will capture in mail service
      return res.status(201).send({ message: "success", data: userRel });
    } catch (e) {
      console.log(e);
      throw new BadRequestError("unable to create boaed.");
    }
  }
);

export { router as updateUserToBoardRouter };
