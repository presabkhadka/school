import { Router, type Request, type Response } from "express";
import { getNotice, getStaff } from "../controller/userController";

const userRouter = Router();

userRouter.get("/staffs", getStaff)
userRouter.get("/notice", getNotice)

export { userRouter };
