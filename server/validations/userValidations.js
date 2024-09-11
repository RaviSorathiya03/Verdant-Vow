import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const client = new PrismaClient();

// User Validation Schema
const userValidation = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

// Event Validation Schema
const eventValidation = Joi.object({
  eventName: Joi.string().min(3).required(),
  eventDays: Joi.number().integer().positive().required(),
  dayFrequency: Joi.number().integer().positive().required(),
});

// Follow Validation Schema
const followValidation = Joi.object({
  followId: Joi.string().uuid().required(), // Assuming followId is a UUID string type
});

const postValidation = Joi.object({
  eventId: Joi.string().uuid().required(),
  levelId: Joi.string().uuid().required(),
  image: Joi.string().uri().required(),
  content: Joi.string().required(),
});

// Middleware to check if the user is active
export const activeUserMiddleware = async (req, res, next) => {
  try {
    if (req.userId) {
      const user = await client.user.findUnique({
        where: { id: req.userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.isActive) {
        return res.status(403).json({ message: "Account not activated. Please verify your email." });
      }
    } else if (req.organisationId) {
      const organisation = await client.organization.findUnique({
        where: { id: req.organisationId },
      });
      if (!organisation) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!organisation.isActive) {
        return res.status(403).json({ message: "Account not activated. Please verify your email." });
      }
    }

    next();
  } catch (err) {
    console.error("Active user check error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const activeOrganisation = async (req, res, next) => {
  try {
    const organisation = await client.organization.findFirst({
      where: {
        id: req.organisationId,
      },
    });

    if (!organisation) {
      return res.json({ message: "Organization not found" });
    }

    if (!organisation.isActive) {
      return res.json({ message: "Account not activated. please verify your email" });
    }

    next();
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal Server Error" });
  }
};

export { userValidation, eventValidation, followValidation };
