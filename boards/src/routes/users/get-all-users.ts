import { currentUser, hasReadAccess, requireAuth } from "@rpticketsproject/task-managing-common";
import { User } from "../../model/user";
import express, {Request, Response} from "express";

const router = express.Router();

router.get("/api/board/user/getall", currentUser, requireAuth, hasReadAccess, async (req: Request, res: Response) => {
    const users = await User.find();
    return res.status(200).send({ message: "success", data: users });
})

export {router as boardUserRouter}