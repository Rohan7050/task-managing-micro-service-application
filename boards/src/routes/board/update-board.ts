import {
  BadRequestError,
  currentUser,
  hasAdminAccess,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from "@rpticketsproject/task-managing-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Board } from "../../model/board";
import { UserBoardAccess } from "../../model/user-board-rel";

const router = express.Router();

router.put(
  "/api/board",
  currentUser,
  requireAuth,
  [
    body("name")
      .isString()
      .isLength({ max: 20, min: 5 })
      .withMessage(
        "must be string, max 20 charactors and minimum 5 charactors"
      ),
    body("desc").optional().isString().withMessage("Must be string"),
    body("board").isString().isMongoId().withMessage("invalid board id"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, desc, board: id } = req.body;
    const board = await Board.findById(id);
    if (!board) {
      throw new BadRequestError("invalid Id 1");
    }
    const boardRel = await await UserBoardAccess.findOne({
      user: req.currentUser!.id,
      board: id,
    });
    if (!boardRel) {
        throw new BadRequestError("invalid Id");
    }
    if (req.currentUser!.id !== boardRel.user) {
      throw new NotAuthorizedError();
    }
    board.name = name;
    if (typeof desc == "string") {
      board.desc = desc;
    }
    await board.save();
    return res.status(200).send({ message: "success", data: board });
  }
);

export { router as boardUpdateRouter };
