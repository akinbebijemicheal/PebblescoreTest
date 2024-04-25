import { findOneUser, updateUserById, findSingleUserByUsername, findUsersByUsername } from "../services/userService";
import { } from "../services/friendRequestService";
import { checkIfUserIsPlanMemberBoolean, checkIfUserIsPlanOwner, getAllPlanInvites, getSinglePlanInvite, getSinglePlanInviteBoolean, inviteToPlan, updateInviteStatus } from "../services/inviteService";
import { getPlanById, getPlanByIdBoolean } from "../services/planService";
import { getSingleUserPlan } from "./plan";
import { NextFunction, Response } from "express";
import { omit } from "lodash";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";
const omitData = ["password"];



export const sendPlanInvite = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let invite = req.body;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }


        if (!invite.planId) {
            throw new ApiError(400, "Please provide planId");
        }

        if (!invite.friendId) {
            throw new ApiError(400, "Please provide friendId");
        }

        const planExists = await getPlanByIdBoolean(invite.planId);

        if (!planExists) {
            throw new ApiError(400, "No plan found with given planId");
        }

        let checkPlanOwner = await checkIfUserIsPlanOwner(invite.planId, userId);

        if (!checkPlanOwner) {
            throw new ApiError(400, "You are not the owner of the plan");
        }


        const friendFound = await findOneUser({ id: invite.friendId });

        if (!friendFound) {
            throw new ApiError(400, "Friend doesnt exist in database");
        }

        const userfriends = JSON.parse(user.friends)['friends'];
        const friendexists = userfriends.includes(invite.friendId)
        if (!friendexists) {
            throw new ApiError(400, "This person isnt your friend, please send a request or wait till he accepts friend request");
        }

        checkPlanOwner = await checkIfUserIsPlanOwner(invite.planId, userId);

        if (checkPlanOwner) {
            throw new ApiError(400, "You can not send a plan invite to yourself, as you are the plan owner");
        }

        const checkIfFriendIsAlreadyAPlanMember = await checkIfUserIsPlanMemberBoolean(invite.planId, invite.friendId);
        if (checkIfFriendIsAlreadyAPlanMember) {
            throw new ApiError(400, "Friend is already a member of the plan");
        }

        invite.senderId = userId;
        invite.recieverId = invite.friendId;

        invite = await inviteToPlan(invite);


        //email service to both users

        return res.status(200).json({
            data: invite,
            msg: "invite sent successsfully",
            error: false,
        });
    } catch (err) {
        next(err);
    }

};


export const getAllPlanInvite = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let body = req.body;


        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

        const invites = await getAllPlanInvites(body.planId);

        return res.status(200).json({
            data: invites,
            msg: "total plan invites found",
            error: false,
        });
    } catch (err) {
        next(err);
    }
};

export const getPlanInvite = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let body = req.body;


        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

        const invite = await getAllPlanInvites(body.inviteId);

        return res.status(200).json({
            data: invite,
            msg: "invite found",
            error: false,
        });
    } catch (err) {
        next(err);
    }
};

export const acceptPlanInvite = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let invite = req.body;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

        if (!invite.inviteId) {
            throw new ApiError(400, "Please provide planId");
        }

        const inviteExists = await getSinglePlanInviteBoolean(invite.inviteId);

        if (!inviteExists) {
            throw new ApiError(400, "No invite found with given inviteId");
        }

        const getInvite = await getSinglePlanInvite(invite.inviteId);

        const planExists = await getPlanByIdBoolean(getInvite.planId);

        if (!planExists) {
            throw new ApiError(400, "Plan doesnt exist");
        }
        const plan = await getPlanById(getInvite.planId);

        let checkPlanOwner = await checkIfUserIsPlanOwner(getInvite.planId, userId);

        if (checkPlanOwner) {
            throw new ApiError(400, "You can not be a member of this plan, as you are the plan owner");
        }


        if (invite.status != 'accepted') {
            throw new ApiError(400, "Plan Invite Response not valid for this action");
        }


        let req2: any = { "status": invite.status };
        const updateInvite = await updateInviteStatus(req2, invite.inviteId);


        let member: any = {
            "planId": plan.id,
            "ownerId": plan.ownerId,
            "memberId": userId,
        }

        const planMember = await inviteToPlan(member);

        return res.status(200).json({
            data: updateInvite,
            msg: "Invite accepted successsfully",
            error: false,
        });

    } catch (err) {
        next(err);
    }
};



export const rejectPlanInvite = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let invite = req.body;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

        if (!invite.inviteId) {
            throw new ApiError(400, "Please provide planId");
        }

        const inviteExists = await getSinglePlanInviteBoolean(invite.inviteId);

        if (!inviteExists) {
            throw new ApiError(400, "No invite found with given inviteId");
        }

        const getInvite = await getSinglePlanInvite(invite.inviteId);

        const planExists = await getPlanByIdBoolean(getInvite.planId);

        if (!planExists) {
            throw new ApiError(400, "Plan doesnt exist");
        }
        const plan = await getPlanById(getInvite.planId);

        let checkPlanOwner = await checkIfUserIsPlanOwner(getInvite.planId, userId);

        if (checkPlanOwner) {
            throw new ApiError(400, "You can not be a member of this plan, as you are the plan owner");
        }


        if (invite.status != 'rejected') {
            throw new ApiError(400, "Plan Invite Response not valid for this action");
        }


        let req2: any = { "status": invite.status };
        const updateInvite = await updateInviteStatus(req2, invite.inviteId);



        return res.status(200).json({
            data: updateInvite,
            msg: "Invite rejected successsfully",
            error: false,
        });

    } catch (err) {
        next(err);
    }
};



