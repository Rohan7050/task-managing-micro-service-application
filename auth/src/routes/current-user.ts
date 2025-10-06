import express from "express";
import { currentUser, requireAuth } from "@rpticketsproject/task-managing-common";

const router = express.Router();

router.get("/api/user/currentuser", currentUser, requireAuth, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
