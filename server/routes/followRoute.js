import express from 'express';
import { authMiddleware, followValidationMiddleware } from '../middlewares/userFunction.js';
import { followRoute, getFollower, getFollowing, unFollow } from '../controllers/followController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';

const followRoutes = express.Router();

// Route to follow a user
followRoutes.post("/follow", activeUserMiddleware, followValidationMiddleware, authMiddleware, followRoute);

// Route to unfollow a user
followRoutes.post("/unfollow", activeUserMiddleware, authMiddleware, unFollow);

// Route to get followers of the logged-in user
followRoutes.get("/getFollowers", activeUserMiddleware, authMiddleware, getFollower);

// Route to get users the logged-in user is following
followRoutes.get("/getFollowing", activeUserMiddleware, authMiddleware, getFollowing);

export { followRoutes };
