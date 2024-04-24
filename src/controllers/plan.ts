import { findOneUser, updateUserById, findSingleUserByUsername, findUsersByUsername } from "../services/userService"
import { NextFunction, Response } from "express";
import { omit } from "lodash";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";
import { createPlan, findPlanByTitle, getAllPlans, getPlanById, planExists, removePlan, updatePlanById } from "../services/planService";
const omitData = ["password"];



export const createNewPlan = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let plan = req.body;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }



        const planexists = await planExists({ ownerId: userId,  title: plan.title });
        if (planexists) {
            throw new ApiError(400, "You already have a plan with that tiitle");
        }
plan.ownerId = userId;
        plan = await createPlan(plan);

        return res.status(200).json({
            data: plan,
            msg: "plan created successsfully",
            error: false,
        });
    } catch (err) {
        next(err);
    }

};


export const updatePlan = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: userId } = req.user;
  
      let body = req.body;
      body = omit(body, omitData);
  
      const user = await findOneUser({ id: userId });
  
      if (!user) {
        throw new ApiError(400, "User not found");
      }

      const plan = await getPlanById(body.planId );
      if (!plan) {
        throw new ApiError(400, "Plan not found");
      }
  
      const updated = await updatePlanById({plan: body, planId: body.planId, userId: userId});
  
      return res.status(200).json({
        updated: updated[0],
        msg: updated[0] ? "Data updated successfully" : "failed to update",
        error: false,
      });
    } catch (err) {
      next(err);
    }
  };


export const getAllUserPlans = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

       const plan = await getAllPlans(userId);

        return res.status(200).json({
            data: plan,
            msg: "total plan found",
            error: false,
        });
    } catch (err) {
        next(err);
    }

};

export const getSingleUserPlan = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;
        const planId = req.body.planId;


        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

       const plan = await getPlanById(planId);

        return res.status(200).json({
            data: plan,
            msg: "plan found",
            error: false,
        });
    } catch (err) {
        next(err);
    }

};

export const getSingleUserPlanByTitle = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;
        if (!req.body.title) {

        }

        const title = req.body.title;


        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

       const plan = await findPlanByTitle({ownerId: userId, title: title});

        return res.status(200).json({
            data: plan,
            msg: "plan found",
            error: false,
        });
    } catch (err) {
        next(err);
    }

};

export const deletePlan = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;
        const planId = req.body.planId;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

 
         const plan = await removePlan({ownerId: userId, planId: planId});

            return res.status(200).json({
                data: plan,
                msg: "plan removed successsfully",
                error: false,
            });

    } catch (err) {
        next(err);
    }
};



