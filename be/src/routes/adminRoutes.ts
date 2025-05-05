import { Router, type Request, type Response } from "express";
import AdminMiddleware from "../middleware/adminMiddleware";
import {
  addStaff,
  adminLogin,
  adminSignup,
  deleteStaff,
  editStaff,
} from "../controller/adminController";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const adminRouter = Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/signup", adminSignup);
adminRouter.post(
  "/add-staff",
  AdminMiddleware,
  upload.single("staffImage"),
  addStaff
);
adminRouter.delete("/delete-staff/:staffId", AdminMiddleware, deleteStaff);
adminRouter.patch("/update-staff/:staffId", AdminMiddleware, editStaff);

export { adminRouter };
