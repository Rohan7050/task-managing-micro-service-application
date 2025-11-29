import {
  BadRequestError,
  currentUser,
  requireAuth,
  validateRequest,
} from "@rpticketsproject/task-managing-common";
import express, { Request, Response } from "express";
import { Board } from "../../model/board";
import { body } from "express-validator";
import { List } from "../../model/list";
import { Card } from "../../model/card";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/api/board/details",
  currentUser,
  requireAuth,
  [body("board").isString().isMongoId().withMessage("invalid board id")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { board } = req.body;
    const boardDtl = await Board.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(board) } },
      {
        $addFields: {
          id: "$_id",
        },
      },
      {
        $lookup: {
          from: "lists",
          localField: "_id",
          foreignField: "board",
          as: "lists",
          pipeline: [
            {
              $addFields: {
                id: "$_id",
              },
            },
            {
              $lookup: {
                from: "cards",
                localField: "_id",
                foreignField: "list",
                as: "cards",
              },
            },
            {
                $addFields: {
                    cards: {
                        $map: {
                            input: "$cards",
                            as: "card",
                            in: {
                                id: "$$card._id",
                                title: "$$card.title",
                                order: "$$card.order",
                                desc: "$$card.desc",
                                cover_color: "$$card.cover_color",
                                start_date: "$$card.start_date",
                                end_date: "$$card.end_date",
                                assign_to: "$$card.assign_to",
                                list: "$$card.list",
                                board: "$$card.board",
                                createdAt: "$$card.createdAt",
                                updatedAt: "$$card.updatedAt",
                                __v: "$$card.__v"
                            }
                        }
                    }
                }
            },
            { $project: { _id: 0 } },
          ],
        },
      },
      { $project: { _id: 0 } },
    ]);
    if (boardDtl.length === 0) {
      throw new BadRequestError("Board Not Found!");
    }
    return res.status(200).send({
      message: "success",
      data: {
        board: boardDtl[0],
      },
    });
  }
);

export { router as boardGetDetailsRouter };
