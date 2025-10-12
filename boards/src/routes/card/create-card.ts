import express, { Request, Response, NextFunction } from "express";
import {
  hasWriteAccess,
  currentUser,
  requireAuth,
  validateRequest,
  BadRequestError,
} from "@rpticketsproject/task-managing-common";
import { body } from "express-validator";
import { List } from "../../model/list";
import { Card } from "../../model/card";
import { DEFAULT_CARD_ORDER_OFFSET, DEFAULT_INITIAL_CARD_ORDER } from "../../config/constants";

const router = express.Router();

router.post(
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
      board,
      pos,
      curOrder
    } = req.body;
    const isList = await List.findOne({ _id: list, board: board });
    if (!isList) {
      throw new BadRequestError("invalid request");
    }
    let cardOrder: number;
    switch (pos) {
      case "top": {
        const listItem: any[] = await Card.find({ list: list }).sort({ order: 1 });
        cardOrder = listItem && listItem.length > 0 ? listItem[0].order - DEFAULT_CARD_ORDER_OFFSET : DEFAULT_INITIAL_CARD_ORDER;
        break;
      }
      case "bottom": {
        const listItem: any[] = await Card.find({ list: list }).sort({ order: -1 });
        cardOrder = listItem && listItem.length > 0 ? listItem[0].order + DEFAULT_CARD_ORDER_OFFSET : DEFAULT_INITIAL_CARD_ORDER;
        break;
      }
      case "middle": {
        cardOrder = curOrder;
        break;
      }
      default: {
        cardOrder = DEFAULT_INITIAL_CARD_ORDER;
        break;
      }
    }
    const card = Card.build({
      title: title,
      desc: desc ? desc : null,
      cover_color: coverColor ? coverColor : null,
      start_date: startDate ? startDate : null,
      end_date: endDate ? endDate : null,
      assign_to: assignTo ? assignTo : req.currentUser!.id,
      order: cardOrder,
      list,
      board,
    });
    await card.save();
    return res.status(201).send({ message: "success", data: card });
  }
);

export { router as createCardRouter };
