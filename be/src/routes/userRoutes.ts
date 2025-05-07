import { Router, type Request, type Response } from "express";
import { getStaff } from "../controller/userController";

const userRouter = Router();

userRouter.get("/staffs", getStaff)

export { userRouter };
