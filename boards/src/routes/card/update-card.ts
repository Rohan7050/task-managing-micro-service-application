import express, { Request, Response, NextFunction } from "express";
import {
  hasWriteAccess,
  currentUser,
  requireAuth,
  validateRequest,
  BadRequestError,
} from "@rpticketsproject/task-managing-common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { List } from "../../model/list";
import { Card, CardDoc } from "../../model/card";
import { DEFAULT_CARD_ORDER_OFFSET, DEFAULT_INITIAL_CARD_ORDER } from "../../config/constants";

const router = express.Router();

router.put(
  "/api/board/card",
  currentUser,
  requireAuth,
  [
    body("title")
      .isString()
      .isLength({ max: 25, min: 5 })
      .withMessage("title should be minimum of 5 and maximum of 15 charactors"),
    body("desc").optional().isString(),
    body("coverColor").optional().isString(),
    body("startDate").optional().isDate(),
    body("endDate").optional().isDate(),
    body("assignTo").optional().isString().isUUID(),
    body("cardId").isString().isMongoId().withMessage("invalid board id"),
    body("list").isString().isMongoId().withMessage("invalid list id"),
    body("board").isString().isMongoId().withMessage("invalid board id"),
    body('pos').isIn(['top', 'bottom', 'middle']).withMessage("invalid position, choose from 'top', 'bottom', 'middle'"),
    body('curOrder').isNumeric().withMessage("must be number"),
  ],
  validateRequest,
  hasWriteAccess,
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      desc,
      coverColor,
      startDate,
      endDate,
      assignTo,
      list,
      cardId,
      board,
      pos,
      curOrder
    } = req.body;
    const isList = await List.findOne({ _id: list, board: board });
    if (!isList) {
      throw new BadRequestError("invalid request");
    }
    const card = await Card.findOne({board: board, _id: cardId});
    if(!card) {
        throw new BadRequestError("invalid card");
    }
    let order: number;
    switch (pos) {
      case "top": {
        const listItem: any[] = await Card.find({ list: list }).sort({ order: 1 });
        order = listItem && listItem.length > 0 ? listItem[0].order - DEFAULT_CARD_ORDER_OFFSET : DEFAULT_INITIAL_CARD_ORDER;
        break;
      }
      case "bottom": {
        const listItem: any[] = await Card.find({ list: list }).sort({ order: -1 });
        order = listItem && listItem.length > 0 ? listItem[0].order + DEFAULT_CARD_ORDER_OFFSET : DEFAULT_INITIAL_CARD_ORDER;
        break;
      }
      case "middle": {
        order = curOrder;
        break;
      }
      default: {
        order = DEFAULT_INITIAL_CARD_ORDER;
        break;
      }
    }
    
    card.title = title ? title : card.title,
    card.desc = desc ? desc : card.desc,
    card.cover_color = coverColor ? coverColor : card.cover_color,
    card.start_date = startDate ? startDate : card.start_date,
    card.end_date = endDate ? endDate : card.end_date,
    card.assign_to = assignTo ? assignTo : card.assign_to,
    card.order = order,
    card.list = list
    await card.save();
    return res.status(200).send({ message: "success", data: card });
  }
);

export { router as updateCardRouter };
