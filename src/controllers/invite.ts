import { findOneUser, updateUserById, findSingleUserByUsername, findUsersByUsername } from "../services/userService";
import { createFriend, friendExists, findFriend, findFriendByUsername, removeFriend, getAllFriends } from "../services/friendRequestService";
import { NextFunction, Response } from "express";
import { omit } from "lodash";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";
const omitData = ["password"];



export const addFriend = async (
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
        } else if (!friend.friendUsername) {
            throw new ApiError(400, "Please provide friendUsername");

        }

        const friendFound = await findOneUser({ id: friend.friendId });


        if (!friendFound) {
            throw new ApiError(400, "Friend doesnt exist in database");
        }

        const friendexists = await friendExists({ ownerId: userId, friendId: friend.friendId, friendUsername: friendFound.username });
        if (friendexists) {
            throw new ApiError(400, "Friend Already added");
        }

        friend = await createFriend(friend);

        return res.status(200).json({
            data: friend,
            msg: "friend created successsfully",
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

       const friends = await getAllFriends(userId);

        return res.status(200).json({
            data: friends,
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

        const friendexists = await friendExists({ ownerId: userId, friendId: friend.friendId, friendUsername: friend.friendUsername });

        if (friendexists) {
          friend = await removeFriend({ownerId: userId, friendId: friend.friendId});

            return res.status(200).json({
                data: friend,
                msg: "friend removed successsfully",
                error: false,
            });
        }else{
            throw new ApiError(400, "Friend not found");

        }
    } catch (err) {
        next(err);
    }
};



