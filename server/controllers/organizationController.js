import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { uploadToCloudinary } from "../middlewares/uploadMiddleware.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  name: "Gmail",
  service: "Gmail",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const signup = async (req, res) => {
  try {
    const ExistOrganization = await client.organization.findFirst({
      where: {
        name: req.body.organization,
      },
    });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
    if (ExistOrganization) {
      return res.json({
        message: "Oraganization already exist",
      });
    }
    const result = await uploadToCloudinary(req.file);
    const imageUrl = result.secure_url;
    const otp = generateOTP();
    const organization = await client.organization.create({
      data: {
        name: req.body.organization,
        email: req.body.email,
        password: hashedPassword,
        image: imageUrl,
        otp,
      },
    });

    console.log(organization);

    await transporter.sendMail({
      to: req.body.email,
      subject: "Verify Your Email",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "Signup successful. Please verify your email using the OTP sent to your email address." });
  } catch (e) {
    console.log(e);
    res.json({
      message: "Something Went Wrong",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Basic input validation
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    console.log({ gt: new Date() });

    // Find the organization by email and otp, checking if otpExpiresAt is not expired
    const organisation = await client.organization.findFirst({
      where: {
        email,
        otp,
        // Ensure OTP is not expired
      },
    });

    console.log(organisation);

    // If the organization was not found, return an error
    if (!organisation) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // If OTP is valid, update the organization
    await client.organization.update({
      where: { id: organisation.id },
      data: { otp: null, otpExpiresAt: null, isActive: true },
    });

    // Generate a token after successful OTP verification
    const token = jwt.sign(
      { email: organisation.email, organisationId: organisation.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional: Set token expiration
    );

    // Return the token in the response
    res.json(token);
  } catch (e) {
    console.log("OTP Verification error", e);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const signin = async (req, res) => {
  try {
    const username = await client.organization.findFirst({
      where: {
        name: req.body.organization,
      },
    });
    if (!username) {
      return res.json({
        message: "Incorrect Username or Password",
      });
    }

    const comparePassword = bcrypt.compare(req.body.password, username.password);

    if (!comparePassword) {
      return res.json({
        message: "Incorrect Username or Passoword",
      });
    }

    const token = jwt.sign(
      { email: username.email, organisationId: username.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional: Set token expiration
    );

    res.json(token);
  } catch (e) {
    console.log(e);
    res.json({
      message: "Something Went Wrong",
    });
  }
};

export const organisation = async (req, res) => {
  try {
    const org = await client.organization.findFirst({
      where: {
        id: req.organisationId,
      },
      include: {
        users: true,
        fundings: true,
        activationCodes: {
          orderBy: {
            isUsed: "desc",
          },
        },
      },
    });
    res.json(org);
  } catch (e) {
    console.log(e);
    res.json({
      message: "Something Went Wrong",
    });
  }
};

export { signin, signup, verifyOTP };
