import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";
import asyncHandler from "../utils/asyncHandler";
import User, { IUser } from "../models/User"; // Import IUser

interface User {
  id: string;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

// Register user
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;

    // Create user
    const user: IUser = await User.create({
      name,
      email,
      password,
      role,
    });

    sendTokenResponse(user, 201, res);
  }
);

// Login user
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email and password",
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    sendTokenResponse(user, 200, res);
  }
);

// Get current logged in user
export const getMe = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  }
);

// Update user details
export const updateDetails = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
  }
);

// Update password
export const updatePassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  }
);

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
