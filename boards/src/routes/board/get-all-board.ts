import { BadRequestError, currentUser, requireAuth } from "@rpticketsproject/task-managing-common";
import { User } from "../../model/user";
import express, {Request, Response} from "express";
import { UserBoardAccess } from "../../model/user-board-rel";
import { Board } from "../../model/board";

const router = express.Router();

router.get("/api/board", currentUser, requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser!.id;
    const allBoard = await UserBoardAccess.find({ user: userId }).sort({createdAt: -1})
      .populate("board");
    const finalList = allBoard.map((board: any) => ({
        user: board.user,
        name: board.board.name,
        desc: board.board.desc,
        createdAt: board.board.createdAt,
        updatedAt: board.board.updatedAt,
        id: board.board.id,
        accessType: board.accessType
    }))
    return res.status(200).send({ message: "success", data: finalList });
  }catch(e) {
    throw new BadRequestError("unable to create board.")
  }
})

export {router as boardGetallRouter}