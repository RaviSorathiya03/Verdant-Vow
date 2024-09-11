import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
import { uploadToCloudinary } from "../middlewares/uploadMiddleware.js";
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const organisationId = req.organisationId;
    const result = await uploadToCloudinary(req.file);
    const imageUrl = result.secure_url;
    const newBlog = await client.blog.create({
      data: {
        title,
        content,
        userId,
        organizationId: organisationId,
        thumbnail: imageUrl,
        organisationId,
      },
    });

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create blog", error: error.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await client.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        user: true,
        organization: true,
      },
    });
    console.log(blog);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed To Get blog", error: error.message });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const blogs = await client.blog.findMany({ include: { user: true, organization: true } });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed To Get blog", error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content, images, tags } = req.body;

    const blog = await client.blog.findFirst({
      where: { id: blogId, userId: req.userId },
    });

    if (!blog) {
      return res.status(403).json({ message: "You are not authorized to update this blog" });
    }

    const updatedBlog = await client.blog.update({
      where: { id: blogId },
      data: {
        title,
        content,
        images,
        tags: {
          set: [],
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });

    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await client.blog.findFirst({
      where: { id: blogId, userId: req.userId },
    });

    if (!blog) {
      return res.status(403).json({ message: "You are not authorized to delete this blog" });
    }

    await client.blog.delete({
      where: { id: blogId },
    });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error: error.message });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const updatedBlog = await client.blog.update({
      where: { id: blogId },
      data: { likeCount: { increment: 1 } },
    });

    res.status(200).json({ message: "Blog liked successfully", likeCount: updatedBlog.likeCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to like blog", error: error.message });
  }
};

export const unlikeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await client.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updatedBlog = await client.blog.update({
      where: { id: blogId },
      data: { likeCount: { decrement: blog.likeCount > 0 ? 1 : 0 } },
    });

    res.status(200).json({ message: "Blog unliked successfully", likeCount: updatedBlog.likeCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to unlike blog", error: error.message });
  }
};

export const commentBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content, parentId } = req.body;

    const blog = await client.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const newComment = await client.comment.create({
      data: {
        content,
        userId: req.userId,
        blogId,
        parentId,
      },
    });

    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await client.comment.findFirst({
      where: { id: commentId, userId: req.userId },
    });

    if (!comment) {
      return res.status(403).json({ message: "You are not authorized to edit this comment" });
    }

    const updatedComment = await client.comment.update({
      where: { id: commentId },
      data: { content },
    });

    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment", error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await client.comment.findFirst({
      where: { id: commentId, userId: req.userId },
    });

    if (!comment) {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    await client.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error: error.message });
  }
};
