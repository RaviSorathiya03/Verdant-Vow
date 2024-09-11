import Joi from "joi";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

// User validation schema
const userValidation = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().min(2).required(),
  lastname: Joi.string().min(2).required(),
  password: Joi.string().min(8).required(),
});

// Event validation schema
const eventValidation = Joi.object({
  eventName: Joi.string().min(3).required(),
  eventDays: Joi.number().integer().positive().required(),
  dayFrequency: Joi.number().integer().positive().required(),
});

// Follow validation schema
const followValidation = Joi.object({
  followId: Joi.string().uuid().required(),
});

const postValidation = Joi.object({
  content: Joi.string().min(10).max(500).required(),
  eventId: Joi.string(),
  levelId: Joi.string(),
  image: Joi.string(),
});

// Middleware for user validation
export const userValidationMiddleware = (req, res, next) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Send data in the correct format",
      details: error.details,
    });
  }
  next();
};

// Middleware for event validation
export const eventValidationMiddleware = (req, res, next) => {
  const { error } = eventValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Send event data in the correct format",
      details: error.details,
    });
  }
  next();
};

// Middleware for follow validation
export const followValidationMiddleware = (req, res, next) => {
  const { error } = followValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Send follow data in the correct format",
      details: error.details,
    });
  }
  next();
};

export const postValidationMiddleware = (req, res, next) => {
  const { error } = postValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Send post data in the correct format",
      details: error.details,
    });
  }
  next();
};

// Middleware for JWT authentication
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      console.log(decoded);
      if (decoded.userId) {
        req.userId = decoded.userId;
      } else {
        req.organisationId = decoded.organisationId;
        console.log(req.organisationId);
      }
      next();
    });
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//middleware to check the status of the event
const checkEventStatus = async (req, res, next) => {
  const { eventId } = req.body;

  try {
    const event = await client.event.findFirst({
      where: {
        id: eventId,
        userId: req.userId,
      },
    });

    if (event.status === "INCOMPLETE") {
      return res.status(403).json({
        message: "This event is marked as incomplete and cannot be modified.",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking event status:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const authMiddlewareO = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.organisationId = decoded.organizationId;
      next();
    });
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default checkEventStatus;
