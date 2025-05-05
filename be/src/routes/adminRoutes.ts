import { Router, type Request, type Response } from "express";
import AdminMiddleware from "../middleware/adminMiddleware";
import { adminLogin } from "../controller/adminController";

const adminRouter = Router();

adminRouter.post("/login", adminLogin);

export { adminRouter };
