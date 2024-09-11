import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { uploadToCloudinary } from "../middlewares/uploadMiddleware.js";

dotenv.config();

const client = new PrismaClient();
const OTP_EXPIRATION_TIME = 10 * 60 * 1000;

const transporter = nodemailer.createTransport({
  name: "Gmail",
  service: "Gmail",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const signup = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname, bio } = req.body;
    const existingUser = await client.user.findFirst({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: "User with the given username is already registered" });
    }

    if (await client.user.findFirst({ where: { email } })) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const result = await uploadToCloudinary(req.file);
    const imageUrl = result.secure_url;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    await client.user.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        bio,
        password: hashedPassword,
        otp,
        image: imageUrl,
        otpExpiresAt: new Date(Date.now() + OTP_EXPIRATION_TIME),
        isActive: false, // User is inactive until OTP is verified
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "Signup successful. Please verify your email using the OTP sent to your email address." });
  } catch (e) {
    console.log("Signup error", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await client.user.findFirst({
      where: {
        email,
        otp,
        otpExpiresAt: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    await client.user.update({
      where: { id: user.id },
      data: { otp: null, otpExpiresAt: null, isActive: true }, // Activate user after verification
    });

    const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET);
    res.json(token);
  } catch (e) {
    console.log("OTP Verification error", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await client.user.findFirst({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password)) || !user.isActive) {
      return res.status(400).json({ message: "Username or password is incorrect or user is not activated" });
    }

    const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET);
    res.json(token);
  } catch (e) {
    console.log("Signin error", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await client.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otp = generateOTP();
    await client.user.update({
      where: { id: user.id },
      data: { otp, otpExpiresAt: new Date(Date.now() + OTP_EXPIRATION_TIME) },
    });

    await transporter.sendMail({
      to: email,
      subject: "Reset Your Password",
      text: `Your OTP for password reset is ${otp}`,
    });

    res.json({ message: "OTP sent to your email address." });
  } catch (e) {
    console.log("Forgot Password error", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await client.user.findFirst({
      where: {
        email,
        otp,
        otpExpiresAt: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await client.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, otp: null, otpExpiresAt: null },
    });

    res.json({ message: "Password reset successfully." });
  } catch (e) {
    console.log("Reset Password error", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get routes
const getUsername = async (req, res) => {
  try {
    const user = await client.user.findFirst({
      where: {
        id: req.userId,
      },
      include: {
        events: {
          include: {
            levels: true,
          },
        },
        blogs: true,
        organization: true,
      },
    });

    if (!user) {
      return res.json({
        message: "something went wrong",
      });
    }

    res.json({
      user,
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "something went wrong",
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await client.user.findFirst({
      where: {
        username,
      },
      include: {
        events: {
          include: {
            levels: true,
          },
        },
        blogs: true,
        organization: true,
      },
    });
    res.json(user);
  } catch (e) {
    console.log(e);
    res.json({
      message: "something went wrong",
    });
  }
};

export { signup, signin, verifyOTP, forgotPassword, resetPassword, getUsername, getUserProfile };
