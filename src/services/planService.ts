import { encryptSync } from "../util/encrypt";
import User from "../models/User";
import Plan from "../models/Plan";
import { Op } from "sequelize";

export const createPlan = async (payload: any) => {
  const plan = await Plan.create(payload);
  return plan;
};

export const getPlanById = async (id: string) => {
  const plan = await Plan.findByPk(id);
  if (!plan) {
    throw new Error("Plan not found");
  }
  return plan;
};

export const updatePlanById = async (options: { plan: any | null; planId: string | null; userId: string | null; } = {
  plan: null,
  planId: null,
  userId: null,
}) => {
  if (!options.plan || !options.planId) {
    throw new Error("Please provide plan data and/or plan id to update");
  }
  if (!options.userId) {
    throw new Error("Invalid user id");
  }
  if (options.plan.id || options.planId) {
    const id = options.plan.id || options.planId;

    const plan = options.plan;

    return Plan.update(plan, {
      where: {
        id: id,
        ownerId: options.userId
      },
    });
  }
};

export const getAllPlans = async (ownerId: string) => {
  const where: any = {
    ownerId: ownerId,
  };
  const plan = await Plan.findAll({ where: where });
  if (!plan) {
    throw new Error("User not found");
  }
  return plan;
};

export const planExists = async (
  options: { ownerId: string | null; title: string | null; } = {
    ownerId: null,
    title: null,
  }
) => {
  console.log(options)
  if (!options.ownerId) {
    throw new Error("Please provide ownerId");
  }
  if (!options.title) {
    throw new Error("Please provide title");
  }
  const where: any = {
    ownerId: options.ownerId,
    title: options.title
  };


  const plans = await Plan.findAll({ where: where });
  return plans.length > 0;
};




export const findPlanByTitle = async (options: any) => {
  if (!options.ownerId) {
    throw new Error("Please provide ownerId");
  }

  if (options.title) {
    const where: any = {
      ownerId: options.ownerId,
      title: options.title,
    };
    const plan = await Plan.findOne({ where: where });
    return plan;
  } else {
    throw new Error("Please provide plan title");

  }


};


export const removePlan = async (options: any) => {
  if (!options.ownerId) {
    throw new Error("Please provide ownerId");

  }
  if (options.planId) {
    const where: any = {
      ownerId: options.ownerId,
      id: options.planId,
    };


    return Plan.destroy({ where: where });
  } else {
    throw new Error("Please provide plan id");

  }

};
