import { findOneUser, updateUserById, findSingleUserByUsername, findUsersByUsername } from "../services/userService";
import { friendRequestExists, checkRequestValidity, createFriendRequest } from "../services/friendRequestService";
import { NextFunction, Response } from "express";
import { omit } from "lodash";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";
const omitData = ["password"];



export const sendFriendRequest = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let friend = req.body;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

        if (!friend.reciepentId) {
            throw new ApiError(400, "Please provide reciepentId");
        }
        const friendFound = await findOneUser({ id: friend.reciepentId });


        if (!friendFound) {
            throw new ApiError(400, "reciepentId doesnt exist in database");
        }
console.log(user)
        const userfriends = user.friends[0];
        const friendexists = userfriends.includes(friend.friendId)
        if (friendexists) {
            throw new ApiError(400, "Friend Already added");
        }

        friend = await createFriendRequest(friend);

        return res.status(200).json({
            data: friend,
            msg: "friend created successsfully",
            error: false,
        });
    } catch (err) {
        next(err);
    }

};



export const acceptFriendRequest = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let friendRequest = req.body;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

        const friendrequestexists = await friendRequestExists({ id: friendRequest.friendRequestId });

        if (!friendRequest.status) {
            throw new ApiError(400, "Friend Request Response not found");

        }

        if (friendRequest.status != 'accepted') {
            throw new ApiError(400, "Friend Request Response not valid for this action");

        }

        const request = await checkRequestValidity(friendRequest.friendRequestId, userId)

        if (!request) {
            throw new ApiError(400, "Friend request not found for this reciepient");
        }

        const senderId = request.senderId;

        const sender = await findOneUser({ id: senderId });

        if (!sender) {
            throw new ApiError(400, "Sender not found");
        }

        const senderfriends = sender.friends[0];


        senderfriends.push(friendRequest.reciepentId)
        const body = { "friends": senderfriends };

        const updated = await updateUserById(body, parseInt(userId, 10));


        return res.status(200).json({
            data: updated,
            msg: updated[0] ? "friend request accepted successfully" : "failed to accept",
            error: false,
        });

    } catch (err) {
        next(err);
    }
};


export const rejectFriendRequest = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let friendRequest = req.body;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

        const friendrequestexists = await friendRequestExists({ id: friendRequest.friendRequestId });

        if (!friendRequest.status) {
            throw new ApiError(400, "Friend Request Response not found");

        }

        if (friendRequest.status != 'rejected') {
            throw new ApiError(400, "Friend Request Response not valid for this action");

        }

        const request = await checkRequestValidity(friendRequest.friendRequestId, friendRequest.reciepentId)

        if (!request) {
            throw new ApiError(400, "Friend request not found for this reciepient");
        }

        const senderId = request.senderId;

        const sender = await findOneUser({ id: senderId });

        if (!sender) {
            throw new ApiError(400, "Sender not found");
        }

        const senderfriends = sender.friends[0];


        senderfriends.push(friendRequest.reciepentId)
        const body = { "friends": senderfriends };



        return res.status(200).json({
            data: [],
            msg: "friend request rejected successfully",
            error: false,
        });

    } catch (err) {
        next(err);
    }
};



export const getAllUserFriends = async (
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
        const userfriends = user.friends[0];
        let friends: any[] = [];
        let userpush;
        for (let i = 0; i < userfriends.length; i++) {
            userpush = await findOneUser({ id: userfriends[i] });
            friends.push(userpush)
        }

        return res.status(200).json({
            data: friends,
            msg: "total friends found",
            error: false,
        });
    } catch (err) {
        next(err);
    }

};

export const getSingleUserFriend = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        const body = req.body

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }


        const friend = await findOneUser({ id: body.friendId });


        return res.status(200).json({
            data: friend,
            msg: "total friends found",
            error: false,
        });
    } catch (err) {
        next(err);
    }
};

export const unFriendUser = async (
    req: customRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user;

        let friend = req.body;

        const user = await findOneUser({ id: userId });

        if (!user) {
            throw new ApiError(400, "User not found");
        }

        if (!friend.friendId) {
            throw new ApiError(400, "Please provide friendId");
        }




        const userfriends = user.friends[0];


        const index = userfriends.indexOf(friend.friendId);

        if (index == -1) {

            throw new ApiError(400, "Friend not found");

        }

        const x = userfriends.splice(index, 1);

        const body = { "friends": userfriends };

        const updated = await updateUserById(body, parseInt(userId, 10));

        return res.status(200).json({
            data: friend,
            msg: updated[0] ? "friend removed successsfully" : "failed to remove friend",
            error: false,
        });

    } catch (err) {
        next(err);
    }
};



