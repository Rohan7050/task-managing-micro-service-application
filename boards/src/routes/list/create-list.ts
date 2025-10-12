import express, {Request, Response, NextFunction} from 'express';
import { List } from '../../model/list';
import { hasWriteAccess, currentUser, requireAuth, validateRequest } from '@rpticketsproject/task-managing-common';
import { body } from 'express-validator';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/api/board/list', currentUser, requireAuth, [
    body('name').isString().isLength({max: 15, min: 5}).withMessage("name should be minimum of 5 and maximum of 15 charactors"),
    body('desc').optional().isString(),
    body('board').isString().isMongoId().withMessage("invalid board id"),
], validateRequest, hasWriteAccess, async (req: Request, res: Response, next: NextFunction) => {
    const {name, desc='', board} = req.body;
    const isList: any[] = await List.find({board}).populate("board").sort({"order": -1});
    console.log(isList)
    let curOrder: number = 0;
    if(isList.length === 0) {
        curOrder = 0
    }else {
        curOrder = isList[0]!.order + 1;
    }
    const list = List.build({
        name,
        desc,
        order: curOrder,
        board: new mongoose.Types.ObjectId(board)
    })
    await list.save();
    return res.status(201).send({ message: "success", data: list });
})

export {router as createListRouter}