import { encryptSync } from "../util/encrypt";
import User from "../models/User";
import FriendRequest from "../models/FriendRequest";
import { Op } from "sequelize";
import { findOneUser } from "./userService";

export const createFriendRequest = async (payload: any) => {
  const friend = await FriendRequest.create(payload);
  return friend;
};


export const updateFriendRequestStatus = (friendRequest: any, friendRequestId: string) => {
      return FriendRequest.update(friendRequest, {
        where: { id: friendRequestId },
      });
};


export const checkRequestValidity = (friendRequestId: string, recipientId: string) => {
  const requestValid =  FriendRequest.findOne({
    where: { 
      id: friendRequestId, 
      recipientId: recipientId, 
    },
  });

  return requestValid;

};

export const getFriendById = async (id: string) => {
  const friend = await FriendRequest.findByPk(id);
  if (!friend) {
    throw new Error("User not found");
  }
  return friend;
};

export const getAllFriendRequests = async (senderId: string) => {
  const where: any = {
    senderId: senderId,
  };
  const friendRequests = await FriendRequest.findAll({where: where});

  return friendRequests;
};

export const friendRequestExists = async (
  options: { id: string | null;} = {
    id: null,
  }
) => {
  if (!options.id) {
    throw new Error("Please provide request Id");
  }
  const where: any = {
    id: options.id,
  };


  const friendRequest = await FriendRequest.findOne({ where: where });
  if (!friendRequest) {
  throw new Error("Friend Request doesnt exist with that requestId");
  }

  return friendRequest;
};




export const findFriendByUsername = async (options: any) => {
  if (!options.ownerId) {
    throw new Error("Please provide ownerId");

  }

  if (options.friendUsername) {
    const where: any = {
      ownerId: options.ownerId,
      friendId: options.friendId,
    };
    const friend = await FriendRequest.findOne({ where: where });
    return friend;
  } else {
    throw new Error("Please provide friend username");

  }


};


export const removeFriend = async (options: any) => {
  if (!options.ownerId) {
    throw new Error("Please provide ownerId");

  }
  if (options.friendId) {
    const where: any = {
      ownerId: options.ownerId,
      friendId: options.friendId,
    };


    return FriendRequest.destroy({ where: where });
  } else {
    throw new Error("Please provide friend id");

  }

};
