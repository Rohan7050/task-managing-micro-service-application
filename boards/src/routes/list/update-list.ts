import express, {Request, Response, NextFunction} from 'express';
import { List } from '../../model/list';
import { hasWriteAccess, currentUser, requireAuth, validateRequest, BadRequestError } from '@rpticketsproject/task-managing-common';
import { body } from 'express-validator';
import mongoose from 'mongoose';

const router = express.Router();

router.put('/api/board/list', currentUser, requireAuth, [
    body('name').isString().isLength({max: 15, min: 5}).withMessage("name should be minimum of 5 and maximum of 15 charactors"),
    body('desc').optional().isString(),
    body("listId").isString().isMongoId().withMessage("invalid list id"),
    body('board').isString().isMongoId().withMessage("invalid board id"),
], validateRequest, hasWriteAccess, async (req: Request, res: Response, next: NextFunction) => {
    const {name, desc, board, listId} = req.body;
    const list = await List.findById(listId);
    if(!list)  {
        throw new BadRequestError("invalid list id");
    }
    list.name = name;
    if(desc) {
        list.desc = desc;
    }
    await list.save();
    return res.status(200).send({ message: "success", data: list });
})

export {router as updateListRouter}