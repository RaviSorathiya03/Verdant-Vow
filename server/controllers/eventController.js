import express from "express";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import cron from "node-cron";
import { io } from "../socket/socket.js";

const client = new PrismaClient();

const createEvent = async (req, res) => {
  try {
    const { eventName, eventDays, dayFrequency } = req.body;

    const event = await client.event.create({
      data: {
        eventName,
        eventDays,
        dayFrequency,
        status: "PENDING",
        userId: req.userId,
      },
    });

    const levelsCount = Math.ceil(eventDays / dayFrequency);
    const startDate = new Date();

    for (let i = 1; i <= levelsCount; i++) {
      const dueDate = dayjs(startDate)
        .add((i - 1) * dayFrequency, "day")
        .toDate();
      await client.level.create({
        data: {
          eventId: event.id,
          levelNumber: i,
          dueDate,
          isCompleted: false,
        },
      });
    }

    res.status(201).json({
      message: "Event created successfully with levels and due dates.",
      event,
    });
  } catch (e) {
    console.error("Error creating event:", e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await client.event.findFirst({
      where: {
        id: eventId,
      },
      include: {
        levels: {
          orderBy: {
            levelNumber: "asc",
          },
        },
      },
    });
    res.json(event);
  } catch (error) {
    console.error("Error Getting event:", e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id, eventName, eventDays, dayFrequency } = req.body;

    const event = await client.event.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!event) {
      return res.status(403).json({
        message: "Event does not exist or you are not authorized to update this event.",
      });
    }

    const updatedEvent = await client.event.update({
      where: { id },
      data: {
        eventName,
        eventDays,
        dayFrequency,
        status: "PENDING",
      },
    });

    const levelsCount = Math.ceil(eventDays / dayFrequency);
    const existingLevels = await client.level.findMany({
      where: { eventId: updatedEvent.id },
    });

    for (const level of existingLevels) {
      if (level.levelNumber > levelsCount && !level.isCompleted) {
        await client.level.delete({
          where: { id: level.id },
        });
      }
    }

    const startDate = new Date();
    for (let i = 1; i <= levelsCount; i++) {
      const dueDate = dayjs(startDate)
        .add((i - 1) * dayFrequency, "day")
        .toDate();
      const existingLevel = existingLevels.find((level) => level.levelNumber === i);

      if (existingLevel) {
        if (!existingLevel.isCompleted) {
          await client.level.update({
            where: { id: existingLevel.id },
            data: { dueDate },
          });
        }
      } else {
        await client.level.create({
          data: {
            eventId: updatedEvent.id,
            levelNumber: i,
            dueDate,
            isCompleted: false,
          },
        });
      }
    }

    res.status(201).json({
      message: "Event updated successfully with adjusted levels and due dates.",
      updatedEvent,
    });
  } catch (e) {
    console.error("Error updating event:", e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await client.event.findFirst({
      where: {
        id: eventId,
        userId: req.userId,
      },
    });

    if (!event) {
      return res.status(403).json({
        message: "Event does not exist or you are not authorized to delete this event.",
      });
    }

    await client.$transaction(async (prisma) => {
      await prisma.level.deleteMany({
        where: { eventId: event.id },
      });

      await prisma.event.delete({
        where: { id: event.id },
      });
    });

    res.json({
      message: "Event and associated levels successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      message: "An error occurred while deleting the event",
      error: error.message,
    });
  } finally {
    await client.$disconnect();
  }
};

// Cron job to update event status and send notifications
cron.schedule("0 0 * * *", async () => {
  try {
    const events = await client.event.findMany({
      include: {
        levels: true,
        user: true,
      },
    });

    for (const event of events) {
      const overdueLevels = event.levels.filter((level) => !level.isCompleted && dayjs().isAfter(level.dueDate));
      if (overdueLevels.length >= 3) {
        await client.event.update({
          where: { id: event.id },
          data: { status: "INCOMPLETE" },
        });

        // Store notification for event disqualification
        await client.notification.create({
          data: {
            userId: event.userId,
            eventId: event.id,
            message: `Your event "${event.eventName}" has been marked as INCOMPLETE due to missing posts.`,
            type: "EVENT_INCOMPLETE",
            read: false,
          },
        });
      }

      const todayDueLevels = event.levels.filter((level) => !level.isCompleted && dayjs(level.dueDate).isSame(dayjs(), "day"));

      if (todayDueLevels.length > 0) {
        io.to(event.user.id).emit("postPending", {
          message: "Your post for today is pending!",
          eventId: event.id,
        });

        // Store notification for pending post
        await client.notification.create({
          data: {
            userId: event.userId,
            eventId: event.id,
            message: "Your post for today is pending!",
            type: "POST_PENDING",
            read: false,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error updating event statuses:", error);
  }
});

const allEvents = async (req, res) => {
  try {
    const events = await client.event.findMany({
      where: {
        userId: req.userId,
      },
    });

    if (!events) {
      return res.json({
        message: "Something went wrong",
      });
    }
    res.json(events);
  } catch (e) {
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

export { createEvent, updateEvent, deleteEvent, allEvents };
