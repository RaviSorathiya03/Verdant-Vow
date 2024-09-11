import express from "express";
import { authMiddleware, userValidationMiddleware } from "../middlewares/userFunction.js";
import { signin, signup, verifyOTP, forgotPassword, resetPassword, getUsername, getUserProfile } from "../controllers/userController.js";
import { activeUserMiddleware } from "../validations/userValidations.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const userRoute = express.Router();

// Route for user signup with validation
userRoute.post("/signup", upload.single("image"), signup); //message

// Route for user signin
userRoute.post("/signin", signin); //token

// Route for OTP verification
userRoute.post("/verify-otp", verifyOTP); //token

// Route for password recovery
userRoute.post("/forgot-password", forgotPassword);

// Route for password reset
userRoute.post("/reset-password", resetPassword);

userRoute.get("/", authMiddleware, activeUserMiddleware, getUsername);

userRoute.get("/:username", authMiddleware, activeUserMiddleware, getUserProfile);

export { userRoute };
