import { encryptSync } from "../util/encrypt";
import User from "../models/User";
import FriendRequest from "../models/FriendRequest";
import { Op } from "sequelize";
import { findOneUser } from "./userService";

export const createFriendRequest = async (payload: any) => {
  const friend = await FriendRequest.create(payload);
  return friend;
};


export const updateFriendRequestStatus = (friendRequest: any, reciepientId: string) => {
      return FriendRequest.update(friendRequest, {
        where: { id: reciepientId },
      });
};


export const checkRequestValidity = (friendRequestId: string, reciepientId: string) => {
  const requestValid =  FriendRequest.findOne({
    where: { 
      id: friendRequestId, 
      reciepientId: reciepientId, 
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

export const getAllFriends = async (ownerId: string) => {
  const where: any = {
    ownerId: ownerId,
  };
  const friend = await FriendRequest.findAll({where: where});
  if (!friend) {
    throw new Error("User not found");
  }
  return friend;
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


export const findFriend = async (options: any) => {
  if (!options.ownerId) {
    throw new Error("Please provide ownerId");

  }
  const where: any = {
    ownerId: options.ownerId,
    [Op.or]: [],
  };
  if (options.friendId) {
    where[Op.or].push({ friendId: options.friendId });
  } else if (options.friendUsername) {
    where[Op.or].push({ friendUsername: options.friendUsername });
  } else {
    throw new Error("Please provide either of these options: friend Id of friend username");

  }

  const friend = await FriendRequest.findOne({ where: where });
  return friend;
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
