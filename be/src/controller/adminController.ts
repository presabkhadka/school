import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin } from "../db/db";
import { adminValidation } from "../validation/adminValidation";

dotenv.config();
let JWT_SECRET = process.env.JWT_SECRET as string;

export async function adminLogin(req: Request, res: Response) {
  try {
    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;

    if (!userEmail || !userPassword) {
      res.status(401).json({
        msg: "Input fields cannot be left empty",
      });
      return;
    }

    let existingUser = await Admin.findOne({
      userEmail,
    });

    if (!existingUser) {
      res.status(404).json({
        msg: "No such user found in our db",
      });
      return;
    }

    let token = jwt.sign({ userEmail }, JWT_SECRET);
    res.status(200).json({
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

export async function adminSignup(req: Request, res: Response) {
  try {
    let parseData = adminValidation.parse(req.body);

    let { userName, userEmail, userPassword, userContact } = parseData;

    let existingUser = await Admin.findOne({
      userEmail,
    });

    if (existingUser) {
      res.status(409).json({
        msg: "Admin already exists with this email address",
      });
      return;
    }

    await Admin.create({
      userName,
      userEmail,
      userPassword,
      userContact,
    });

    res.status(200).json({
      msg: "Admin created successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}
