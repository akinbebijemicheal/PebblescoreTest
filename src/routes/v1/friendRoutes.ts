import { Router } from "express";
import { requireUser, validateRequest } from "../../middleware";
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getAllUserFriends, unFriendUser } from "../../controllers/friendRequest";
import { updateSchema } from "../../validation/user";

const friendRouter = Router();

friendRouter.post("/", requireUser, sendFriendRequest);
friendRouter.get("/", requireUser, getAllUserFriends);
friendRouter.post("/acceptRequest", requireUser, acceptFriendRequest);
friendRouter.post("/rejectRequest", requireUser, rejectFriendRequest);
friendRouter.patch("/", requireUser, unFriendUser);

export default friendRouter;

/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: Friends
 */

/**
 * @swagger
 * /v1/friend:
 *   post:
 *     summary: Send Friend Request
 *     tags: [Friend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientId
 *             properties:
 *               recipientId:
 *                 type: string
 *             example:
 *               recipientId:  recipientId
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request
 * 
 *   get:
 *     summary: Get all user friends
 *     description: All friends and their information.
 *     tags: [Friend]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *
 *   patch:
 *     summary: Remove friend
 *     description: Remove friend.
 *     tags: [Friend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientId
 *             properties:
 *               recipientId:
 *                 type: string
 *             example:
 *               recipientId:  recipientId
 *     responses:
 *       "200":
 *         description: OK
 * 
 * /v1/friend/acceptRequest:
 *   post:
 *     summary: Accept Friend Request
 *     tags: [Friend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendRequestId
 *               - status
 *             properties:
 *               friendRequestId:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               friendRequestId:  friendRequestId
 *               status:  accepted
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request
 * 
 * 
 * /v1/friend/rejectRequest:
 *   post:
 *     summary: Reject Friend Request
 *     tags: [Friend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendRequestId
 *               - status
 *             properties:
 *               friendRequestId:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               friendRequestId:  friendRequestId
 *               status:  rejected
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request
 * 
 *
 */
