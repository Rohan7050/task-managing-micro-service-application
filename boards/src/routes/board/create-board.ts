import { BadRequestError, currentUser, requireAuth, validateRequest } from "@rpticketsproject/task-managing-common";
import { User } from "../../model/user";
import express, {Request, Response} from "express";
import { body } from "express-validator";
import { Board } from "../../model/board";
import { UserBoardAccess } from "../../model/user-board-rel";
import mongoose from "mongoose";

const router = express.Router();

router.post("/api/board", currentUser, requireAuth, [
    body('name').isString().isLength({max: 20, min: 5}).withMessage("must be string, max 20 charactors and minimum 5 charactors"),
    body('desc').optional().isString().withMessage("Must be string")
], validateRequest, async (req: Request, res: Response) => {
    try {
        const {name, desc = ''} = req.body;
        const newBooard = Board.build({name, desc});
        await newBooard.save();
        const userBoardRel = UserBoardAccess.build({
            user: req.currentUser!.id,
            board: newBooard!.id,
            accessType: 'admin',
            accept: true
        })
        await userBoardRel.save();
        return res.status(201).send({ message: "success", data: newBooard });
    }catch(e) {
        console.log(e);
        throw new BadRequestError("unable to create boaed.")
    }
})

export {router as boardCreateRouter}