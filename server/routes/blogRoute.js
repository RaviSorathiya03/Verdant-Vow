import express from "express";
import { authMiddleware } from "../middlewares/userFunction.js";
import { commentBlog, createBlog, deleteBlog, deleteComment, editComment, getAllBlog, getBlog, likeBlog, unlikeBlog, updateBlog } from "../controllers/blogController.js";
import { activeUserMiddleware } from "../validations/userValidations.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const blogRouter = express.Router();

// Route to create a new blog
blogRouter.post("/", authMiddleware, upload.single("image"), createBlog);

blogRouter.get("/:blogId", authMiddleware, getBlog);

blogRouter.get("/", authMiddleware, getAllBlog);

// Route to update an existing blog
blogRouter.put("/updateBlog/:blogId", authMiddleware, activeUserMiddleware, updateBlog);

// Route to delete a blog
blogRouter.delete("/deleteBlog/:blogId", authMiddleware, activeUserMiddleware, deleteBlog);

// Route to like a blog
blogRouter.post("/likeBlog/:blogId", authMiddleware, activeUserMiddleware, likeBlog);

// Route to unlike a blog
blogRouter.post("/unlikeBlog/:blogId", authMiddleware, activeUserMiddleware, unlikeBlog);

// Route to add a comment to a blog
blogRouter.post("/comment/:blogId", authMiddleware, activeUserMiddleware, commentBlog);

// Route to update a comment on a blog
blogRouter.patch("/updateComment/:commentId", authMiddleware, activeUserMiddleware, editComment);

// Route to delete a comment from a blog
blogRouter.delete("/deleteComment/:commentId", authMiddleware, activeUserMiddleware, deleteComment);

export { blogRouter };
