import { encryptSync } from "../util/encrypt";
import User from "../models/User";
import Invite from "../models/Invite";
import PlanMember from "../models/PlanMember";
import { Op } from "sequelize";

export const inviteToPlan = async (payload: any) => {
  const invite = await Invite.create(payload);
  return invite;
};

export const acceptInvite = (invite: any, inviteId: string) => {
  if (invite.id || inviteId) {
    const id = invite.id || inviteId;
    if (!invite.answer) {
      throw new Error("Please provide invite response");

    }

    if (invite.answer != 'accepted' || invite.answer != 'rejected') {
      throw new Error("Invalid invite response type ");

    }

    if (invite.answer == 'accepted') {
      return Invite.update(invite, {
        where: { id: id },
      });
    } else {
      throw new Error("Invalid invite response type for accept action");
    }

  } else {
    throw new Error("Invalid invite id");

  }

};

export const rejectInvite = (invite: any, inviteId: string) => {
  if (invite.id || inviteId) {
    const id = invite.id || inviteId;
    if (!invite.answer) {
      throw new Error("Please provide invite response");

    }

    if (invite.answer != 'accepted' || invite.answer != 'rejected') {
      throw new Error("Invalid invite response type ");

    }

    if (invite.answer == 'rejected') {
      return Invite.update(invite, {
        where: { id: id },
      });
    } else {
      throw new Error("Invalid invite response type for reject action");
    }

  } else {
    throw new Error("Invalid invite id");

  }

};

export const getPlanMembers = async (id: string) => {
  const planMembers = await PlanMember.findAll({ where: { id: id } });
  return planMembers;
};

export const getSinglePlanMember = async (id: string) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new Error(" Plan member/User with that id not found");
  }
  return user;
};

export const newPlanMember = async (payload: any) => {
  const planMember = await PlanMember.create(payload);
  return planMember;
};

