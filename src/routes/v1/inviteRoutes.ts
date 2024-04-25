import { Router } from "express";
import { requireUser, validateRequest } from "../../middleware";
import { updateSchema } from "../../validation/user";
import { acceptPlanInvite, getAllPlanInvite, rejectPlanInvite, sendPlanInvite } from "../../controllers/invite";

const inviteRouter = Router();

inviteRouter.post("/", requireUser, sendPlanInvite);
inviteRouter.post("/getPlanInvites", requireUser, getAllPlanInvite);
inviteRouter.post("/getInvite", requireUser, getAllPlanInvite);
inviteRouter.post("/acceptRequest", requireUser, acceptPlanInvite);
inviteRouter.post("/rejectRequest", requireUser, rejectPlanInvite);

export default inviteRouter;

/**
 * @swagger
 * tags:
 *   name: Invites
 *   description: Plan Invites
 */

/**
 * @swagger
 * /v1/invite:
 *   post:
 *     summary: Send Plan Invite
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *               - friendId
 *             properties:
 *               planId:
 *                 type: string
 *               friendId:
 *                 type: string
 *             example:
 *               planId:  planId
 *               friendId:  friendId
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request
 * 
 * /v1/invite/getPlanInvites:
 *   post:
 *     summary: Get all plans Invite
 *     description: All Invites and their information.
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: string
 *             example:
 *               planId:  planId
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request

 * 
 * /v1/invite/getInvite:
 *   post:
 *     summary: Get Single Invite
 *     description: Single Invite and its information.
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inviteId
 *             properties:
 *               inviteId:
 *                 type: string
 *             example:
 *               inviteId:  inviteId
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request
 *
 * 
 * 
 * /v1/invite/acceptRequest:
 *   post:
 *     summary: Accept  Plan Invite
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inviteId
 *               - status
 *             properties:
 *               inviteId:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               inviteId:  inviteId
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
 * /v1/invite/rejectRequest:
 *   post:
 *     summary: Reject Plan Invite
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inviteId
 *               - status
 *             properties:
 *               inviteId:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               inviteId:  inviteId
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
