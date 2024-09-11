import express from "express";
import checkEventStatus, { authMiddleware, eventValidationMiddleware } from "../middlewares/userFunction.js";
import { allEvents, createEvent, deleteEvent, getEvent, updateEvent } from "../controllers/eventController.js";
import { activeUserMiddleware } from "../validations/userValidations.js";

const eventRouter = express.Router();

// Route to create a new event
eventRouter.post("/", authMiddleware, activeUserMiddleware, createEvent);

eventRouter.get("/allEvents", authMiddleware, allEvents);

eventRouter.get("/:eventId", authMiddleware, activeUserMiddleware, getEvent);
// Route to update an existing event
eventRouter.put("/:eventId", authMiddleware, activeUserMiddleware, updateEvent);

eventRouter.delete("/:eventId", authMiddleware, activeUserMiddleware, deleteEvent);

export { eventRouter };
