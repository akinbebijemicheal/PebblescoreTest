import { Router } from "express";
import { requireUser, validateRequest } from "../../middleware";
import { createNewPlan, updatePlan, getAllUserPlans, getSingleUserPlan, getSingleUserPlanByTitle, deletePlan } from "../../controllers/plan";
import { updateSchema } from "../../validation/user";

const planRouter = Router();

planRouter.post("/", requireUser, createNewPlan);
planRouter.get("/", requireUser, getAllUserPlans);
planRouter.patch("/", requireUser, updatePlan);

planRouter.post("/getPlanById", requireUser, getSingleUserPlan);
planRouter.post("/getPlanByTitle", requireUser, getSingleUserPlanByTitle);
planRouter.post("/deletePlan", requireUser, deletePlan);




export default planRouter;

/**
 * @swagger
 * tags:
 *   name: Plan
 *   description: Plan
 */

/**
 * @swagger
 * /v1/plan/:
 *   post:
 *     summary: Add plan
 *     tags: [Plan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - memberCount
 *               - target
 *               - savingsType
 *               - startDate
 *               - endDate
 *               - frequency
 *               - annualSaved
 *               - duration
 *               - memberRelationship
 *             properties:
 *               title:
 *                 type: string
 *               memberCount:
 *                 type: string
 *               target:
 *                 type: string
 *               savingsType:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               frequency:
 *                 type: string
 *               annualSaved:
 *                 type: string
 *               duration:
 *                 type: string
 *               memberRelationship:
 *                 type: string
 *             example:
 *               title:  title
 *               memberCount:  memberCount
 *               target:  target
 *               savingsType:  savingsType
 *               startDate:  startDate
 *               endDate:  endDate
 *               frequency:  frequency
 *               annualSaved:  annualSaved
 *               duration:  duration
 *               memberRelationship:  memberRelationship
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request
 * 
 *   get:
 *     summary: Get all user plans
 *     description: All plans and their information.
 *     tags: [Plan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *
 *   patch:
 *     summary: Update plan
 *     description: Update plan.
 *     tags: [Plan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *               title:
 *                 type: string
 *             example:
 *               planId: planId
 *               title: title
 *     responses:
 *       "200":
 *         description: OK
 * 
 * /v1/plan/getPlanById:
 *   post:
 *     summary: Get plan and its information
 *     tags: [Plan]
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
 * /v1/plan/getPlanByTitle:
 *   post:
 *     summary: Get plan and its information using Title
 *     tags: [Plan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               planId:
 *                 type: string
 *             example:
 *               title:  title
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request
 * 
 * /v1/plan/deletePlan:
 *   post:
 *     summary: Get plan and its information
 *     tags: [Plan]
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
 */
