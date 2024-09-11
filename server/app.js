import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { userRoute } from "./routes/userRoute.js";
import { eventRouter } from "./routes/eventRoute.js";
import { followRoutes } from "./routes/followRoute.js";
import { postRoute } from "./routes/postRoute.js";
import { blogRouter } from "./routes/blogRoute.js";
import { organisationRoute } from "./routes/organisatioRoute.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const server = http.createServer(app);
initSocket(server); // Ensure this function is non-blocking

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || "*" })); // Customize as needed

// Register routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/follow", followRoutes);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/organization", organisationRoute);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  } else if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized access" });
  } else if (err.name === "PrismaClientKnownRequestError") {
    return res.status(400).json({ message: "Database error", details: err.message });
  }

  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    // Close database connections or other cleanup tasks here
  });
});
