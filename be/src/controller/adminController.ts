import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin, Staff } from "../db/db";
import {
  adminValidation,
  staffValidation,
} from "../validation/adminValidation";
import path from "path";
import fs from "fs";

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

    let hashedPassword =await bcrypt.hash(userPassword as string, 10);

    await Admin.create({
      userName,
      userEmail,
      userPassword: hashedPassword,
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

export async function addStaff(req: Request, res: Response) {
  try {
    let parsedData = staffValidation.parse(req.body);
    let { userName, userEmail, userDesignation, userExperience } = parsedData;
    let staffImage = req.file ? `/uploads/${req.file.filename}` : null;

    let existingStaff = await Staff.findOne({
      userEmail,
    });

    if (existingStaff) {
      if (req.file) {
        const filePath = path.join(__dirname, "../uploads", req.file.filename);
        fs.unlink(filePath, (err: any) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      res.status(409).json({
        msg: "Staff with that email already exists in db",
      });
      return;
    }

    await Staff.create({
      userName,
      userEmail,
      userDesignation,
      userExperience,
      staffImage,
    });

    res.status(200).json({
      msg: "Staff created successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

export async function deleteStaff(req: Request, res: Response) {
  try {
    let staffId = req.params.staffId;
    if (!staffId) {
      res.status(404).json({
        msg: "No staff id in params",
      });
      return;
    }

    let existingStaff = await Staff.findOne({
      _id: staffId,
    });

    if (!existingStaff) {
      res.status(404).json({
        msg: "No staff found with that id in db",
      });
      return;
    }

    await Staff.deleteOne({
      _id: staffId,
    });

    res.status(200).json({
      msg: "Staff deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

export async function editStaff(req: Request, res: Response) {
  try {
    let staffId = req.params.staffId;
    if (!staffId) {
      res.status(404).json({
        msg: "No staff id in params",
      });
      return;
    }

    const { userName, userEmail, userDesignation, userExperience } = req.body;
    const staffImage = req.file ? `/uploads/${req.file.filename}` : null;

    const fieldsToUpdate: Record<string, any> = {};

    if (userName) fieldsToUpdate.userName = userName;
    if (userEmail) fieldsToUpdate.userEmail = userEmail;
    if (userDesignation) fieldsToUpdate.userDesignation = userDesignation;
    if (userExperience) fieldsToUpdate.userExperience = userExperience;
    if (staffImage) fieldsToUpdate.staffImage = staffImage;

    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(200).json({
        msg: "No fields to update",
      });
      return;
    }

    let result = await Staff.updateOne(
      {
        _id: staffId,
      },
      { $set: fieldsToUpdate }
    );

    res.status(200).json({
      msg: "Staff updated successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      msg: error.message;
    }
  }
}
