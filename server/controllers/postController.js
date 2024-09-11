import { PrismaClient } from "@prisma/client";
import { uploadToCloudinary } from "../middlewares/uploadMiddleware.js";

const client = new PrismaClient();

const createPost = async (req, res) => {
  try {
    const { eventId, levelId, content } = req.body;

    const eventExist = await client.event.findFirst({
      where: { id: eventId, userId: req.userId },
    });

    if (!eventExist) {
      return res.status(403).json({
        message: "You are not authorized to post in this event or the event does not exist",
      });
    }

    const levelExist = await client.level.findFirst({
      where: {
        id: levelId,
        eventId: eventId,
      },
    });

    if (!levelExist) {
      return res.status(403).json({
        message: "Level does not exist or you are not authorized to post at this level",
      });
    }
    const result = await uploadToCloudinary(req.file);
    const imageUrl = result.secure_url;

    await client.post.create({
      data: {
        userId: req.userId,
        eventId,
        levelId,
        image: imageUrl,
        content,
      },
    });

    await client.level.update({
      where: { id: levelId },
      data: { isCompleted: true },
    });

    res.status(201).json(eventExist);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Something went wrong",
      error: e.message,
    });
  } finally {
    await client.$disconnect();
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId, imageUrl, content } = req.body;

    if (!postId) {
      return res.status(400).json({
        message: "Post ID is required to update the post.",
      });
    }

    const checkPost = await client.post.findFirst({
      where: {
        id: postId,
        userId: req.userId,
      },
    });

    if (!checkPost) {
      return res.status(403).json({
        message: "Post does not exist or you are not authorized to update this post.",
      });
    }

    const updatedPost = await client.post.update({
      where: {
        id: postId,
      },
      data: {
        image: imageUrl,
        content,
      },
    });

    res.json({
      message: "Post updated successfully.",
      updatedPost,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
      error: e.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;

    const checkPost = await client.post.findFirst({
      where: {
        id: postId,
        userId: req.userId,
      },
    });

    if (!checkPost) {
      return res.status(403).json({
        message: "Post does not exist or you are not authorized to delete this post.",
      });
    }

    await client.post.delete({
      where: {
        id: postId,
      },
    });

    await client.level.update({
      where: {
        id: checkPost.levelId,
      },
      data: {
        isCompleted: false,
      },
    });

    res.json({
      message: "Post is deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
      error: e.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const { levelId } = req.params;
    const { userId } = req.userId;
    const post = await client.post.findFirst({
      where: {
        levelId,
        userId,
      },
    });

    const level = await client.level.findUnique({
      where: {
        id: levelId,
      },
    });

    res.json({ post, level });
  } catch (e) {
    console.log(e);
    res.json({
      message: "Something went wrong",
    });
  }
};

export { createPost, updatePost, deletePost, getPost };
