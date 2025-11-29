import {
  BadRequestError,
  currentUser,
  NotAuthorizedError,
  requireAuth,
} from "@rpticketsproject/task-managing-common";
import { User } from "../../model/user";
import express, { Request, Response } from "express";
import { UserBoardAccess } from "../../model/user-board-rel";
import mongoose, { mongo } from "mongoose";
import { JWTToken } from "../../services/jwt";

const router = express.Router();

router.post(
  "/api/board/user/auth",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { boardId } = req.body;
    const userId = req.currentUser!.id;
    console.log(
      "mongoose.Types.ObjectId.isValid(boardId)",
      !mongoose.Types.ObjectId.isValid(boardId)
    );
    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      throw new BadRequestError("Invalid Id");
    }
    const access = await UserBoardAccess.findOne({
      user: userId,
      board: boardId,
    });
    if (!access) {
      throw new NotAuthorizedError();
    }
    const boardToken = JWTToken.create(
      boardId,
      access.accessType,
      userId,
      process.env.JWT_KEY || "mamdawmdawdmad"
    );
    req.session = {
      ...req.session,
      boardToken: boardToken,
    };
    return res.status(200).send({ message: "success" });
  }
);

export { router as UserAccessRouter };
