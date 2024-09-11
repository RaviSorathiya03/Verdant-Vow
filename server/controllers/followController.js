import express from 'express';
import { PrismaClient } from '@prisma/client';
import { io } from '../socket/socket.js';

const client = new PrismaClient();

const authorize = (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  next();
};

const followRoute = async (req, res) => {
  try {
    const { followId } = req.body;

    const findUser = await client.user.findUnique({
      where: { id: followId },
    });

    if (!findUser) {
      return res.status(404).json({ message: "User you want to follow doesn't exist" });
    }

    const existingFollow = await client.follow.findFirst({
      where: { followerId: req.userId, followingId: followId },
    });

    if (existingFollow) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    await client.$transaction(async (prisma) => {
      await prisma.follow.create({
        data: {
          followerId: req.userId,
          followingId: followId,
        },
      });

      await prisma.user.update({
        where: { id: req.userId },
        data: { followingCount: { increment: 1 } },
      });

      await prisma.user.update({
        where: { id: followId },
        data: { followCount: { increment: 1 } },
      });

      // Send notification to the followed user
      const notification = await prisma.notification.create({
        data: {
          userId: followId,
          message: `User ${req.userId} has started following you.`,
          type: 'follow',
          read: false,
        },
      });

      io.to(`user_${followId}`).emit('notification', {
        type: 'follow',
        message: `User ${req.userId} has started following you.`,
        followerId: req.userId,
      });

    });

    res.json({ message: 'You have successfully followed this user' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong', error: e.message });
  }
};

const unFollow = async (req, res) => {
  try {
    const { followId } = req.body;

    const existingFollow = await client.follow.findFirst({
      where: { followerId: req.userId, followingId: followId },
    });

    if (!existingFollow) {
      return res.status(404).json({ message: "You are not following this user" });
    }

    await client.$transaction(async (prisma) => {
      await prisma.follow.delete({
        where: { id: existingFollow.id },
      });

      await prisma.user.update({
        where: { id: req.userId },
        data: { followingCount: { decrement: 1 } },
      });

      await prisma.user.update({
        where: { id: followId },
        data: { followCount: { decrement: 1 } },
      });
    });

    res.json({ message: 'You have successfully unfollowed this user' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong', error: e.message });
  }
};

const getFollower = async (req, res) => {
  try {
    const findUser = await client.user.findUnique({
      where: { id: req.userId },
    });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const followers = await client.follow.findMany({
      where: { followingId: req.userId },
      include: { follower: true },
    });

    res.json({ followers });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getFollowing = async (req, res) => {
  try {
    const findUser = await client.user.findUnique({
      where: { id: req.userId },
    });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = await client.follow.findMany({
      where: { followerId: req.userId },
      include: { following: true },
    });

    const serializedFollowing = following.map(f => ({
      ...f,
      followerId: f.followerId.toString(),
      followingId: f.followingId.toString(),
    }));

    res.json({ following: serializedFollowing });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export { authorize, followRoute, unFollow, getFollower, getFollowing };
