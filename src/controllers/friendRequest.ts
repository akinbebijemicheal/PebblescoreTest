import { findOneUser, updateUserById, findSingleUserByUsername, findUsersByUsername } from "../services/userService";
import { friendRequestExists, checkRequestValidity, createFriendRequest, updateFriendRequestStatus } from "../services/friendRequestService";
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

        if (userId == friend.recipientId) {
            throw new ApiError(400, "You can not send a request to yourself");
        }

        if (!friend.recipientId) {
            throw new ApiError(400, "Please provide recipientId");
        }
        const rId: number = +friend.recipientId;
        friend.recipientId = rId

        const friendFound = await findOneUser({ id: friend.recipientId });


        if (!friendFound) {
            throw new ApiError(400, "recipientId doesnt exist in database");
        }

        //check if you have the user as a friend
        const userfriends = JSON.parse(user.friends)['friends'];
        const friendexists = userfriends.includes(friend.friendId)
        if (friendexists) {
            throw new ApiError(400, "Friend Already added");
        }

        friend.senderId = userId;


        friend = await createFriendRequest(friend);

        //email service to both users


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
            throw new ApiError(400, "Friend request not found for this recipient");
        }

        const senderId = request.senderId;

        const sender = await findOneUser({ id: senderId });

        if (!sender) {
            throw new ApiError(400, "Sender not found");
        }
//for sender
        const senderfriends = JSON.parse(sender.friends)['friends'];


        senderfriends.push(userId)
        const body1 = { "friends": { "friends": senderfriends } };


        const updated1 = await updateUserById(body1, parseInt(senderId, 10));


        //for reciever
        const userfriends = JSON.parse(user.friends)['friends'];


        userfriends.push(senderId)
        const body2 = { "friends": { "friends": userfriends } };

        const updated2 = await updateUserById(body2, parseInt(userId, 10));

        let req2: any = {"status" : friendRequest.status};
        const updatedFriendRequest = await updateFriendRequestStatus(req2, friendRequest.friendRequestId);


        //email service to both users


        return res.status(200).json({
            data: updated2,
            msg: updated2[0] ? "friend request accepted successfully" : "failed to accept",
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

        const request = await checkRequestValidity(friendRequest.friendRequestId, friendRequest.recipientId)

        if (!request) {
            throw new ApiError(400, "Friend request not found for this recipient");
        }

        let req2: any = {"status" : friendRequest.status};
        const updatedFriendRequest = await updateFriendRequestStatus(req2, friendRequest.friendRequestId);

        //email service to both users


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
        const userfriends = JSON.parse(user.friends)['friends'];


        return res.status(200).json({
            data: userfriends,
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

        const rId: number = +body.friendId;
        body.friendId = rId
        const friend = await findOneUser({ id: body.friendId });


        if (!friend) {
            throw new ApiError(400, "Friend not found");
        }
        return res.status(200).json({
            data: friend,
            msg: "ffriend",
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

        const rId: number = +friend.friendId;
        friend.friendId = rId

        const friendData = await findOneUser({ id: friend.friendId });

        if (!friendData) {
            throw new ApiError(400, "Friend is not a registered user");
        }


//for the user
        const userfriends = JSON.parse(user.friends)['friends'];


        const index = userfriends.indexOf(friend.friendId);

        if (index == -1) {

            throw new ApiError(400, "Friend not found");

        }

        const x = userfriends.splice(index, 1);

        const body = { "friends": { "friends": userfriends } };

        const updated = await updateUserById(body, parseInt(userId, 10));


        //for the friend


        const friendFriends = JSON.parse(friendData.friends)['friends'];


        const index2 = friendFriends.indexOf(userId);

        //if friend doesnt have you as a friend, we still move ahead
        if (index2 != -1) {

            const xx = friendFriends.splice(index2, 1);

            const body2 = { "friends": { "friends": friendFriends } };
    
            const updated2 = await updateUserById(body2, parseInt(friend.friendId, 10));
        }

  

        return res.status(200).json({
            data: updated,
            msg: updated[0] ? "friend removed successsfully" : "failed to remove friend",
            error: false,
        });

    } catch (err) {
        next(err);
    }
};



