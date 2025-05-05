import { Router, type Request, type Response } from "express";
import AdminMiddleware from "../middleware/adminMiddleware";
import { adminLogin, adminSignup } from "../controller/adminController";

const adminRouter = Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/signup", adminSignup);

export { adminRouter };
