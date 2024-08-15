import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    // find other user which is following you
    const otherUser = await db.user.findUnique({ where: { id } });
    if (!otherUser) {
      throw new Error("User not found");
    }
    if (otherUser.id === self.id) {
      return false;
    }
    const isAlreadyBlocked = await db.block.findFirst({
      where: {
        blockerId: otherUser.id,
        blockedId: self.id,
      },
    });
    return !!isAlreadyBlocked;
  } catch {
    return false;
  }
};
export const blockUser = async (id: string) => {
  try {
    const self = await getSelf();
    if (self.id === id) {
      throw new Error("Cannot block Yourself");
    }
    const otherUser = await db.user.findUnique({ where: { id } });
    if (!otherUser) {
      throw new Error("User not found");
    }
    // blockerId_blockerId it is by index
    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: otherUser.id,
          blockerId: self.id,
        },
      },
    });
    if (existingBlock) {
      throw new Error("User already blocked");
    }
    const block = await db.block.create({
      data: {
        blockerId: otherUser.id,
        blockedId: self.id,
      },
      include: {
        blocked: true,
      },
    });
    return block;
  } catch {
    console.log("block user error");
  }
};
export const unBlockUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (self.id === id) {
      throw new Error("You cannot unblock yourself");
    }
    const otherUser = await db.user.findUnique({ where: { id } });
    if (!otherUser) {
      throw new Error("NO user found");
    }
    // check if it blocked
    const isAlreadyBlocked = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: otherUser.id,
          blockerId: self.id,
        },
      },
    });
    if (!isAlreadyBlocked) {
      throw new Error("Not blocked!");
    }
    const unblock = await db.block.delete({
      where: {
        id: isAlreadyBlocked.id,
      },
      include: {
        blocked: true,
      },
    });

    return unblock;
  } catch {
    console.log("unblock user error");
  }
};
