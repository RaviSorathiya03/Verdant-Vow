import express from "express";
import { authMiddleware, postValidationMiddleware } from "../middlewares/userFunction.js";
import { createPost, deletePost, getPost, updatePost } from "../controllers/postController.js";
import { activeUserMiddleware } from "../validations/userValidations.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const postRoute = express.Router();

// Route to create a post
postRoute.post("/", authMiddleware, activeUserMiddleware, upload.single("image"), createPost);

// Route to update a post
postRoute.put("/", activeUserMiddleware, authMiddleware, updatePost);

// Route to delete a post
postRoute.delete("/", activeUserMiddleware, authMiddleware, deletePost);

postRoute.get("/:levelId", authMiddleware, activeUserMiddleware, getPost);

export { postRoute };
