import { getSelf } from "./auth-service";
import { db } from "@/lib/db";

//get all the user which are following me

export const getFollowingUsers = async () =>{
  try {
    const self = await getSelf();
    // all the users having currently following users 
     const getFollowedUsers = await db.follow.findMany({where:{
      followedId:self.id
     },
     include:{
      following:true
     }
    })
    return getFollowedUsers;
  } catch{
    return [];
  }
}
// check if we follow the users by id
export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();
    const checkOtherUserExits = await db.user.findUnique({
      where: { id },
    });
    if (!checkOtherUserExits) {
      throw new Error("No other user found");
    }
    // dont follow yourself
    if (checkOtherUserExits.id === self.id) {
      return true;
    }
    // let add following user
    // followedId:self.id --> mera id
    // followingId:checkOtherUserExits.id --> jisko follow kiya
    const existingFollow = await db.follow.findFirst({
      where: { followedId: self.id, followingId: checkOtherUserExits.id },
    });
    return !!existingFollow;
  } catch {
    return false;
  }
};

// action for follow user
export const followUser = async (id: string) => {
  const self = await getSelf();
  const checkOtherUserExits = await db.user.findUnique({
    where: { id },
  });
  if (!checkOtherUserExits) {
    throw new Error("User not found");
  }
  if (checkOtherUserExits.id === self.id) {
    throw new Error("You cannot follow yourself");
  }
  const follow = await db.follow.create({
    data: { followedId: self.id, followingId: checkOtherUserExits.id },
    include: {
      following: true,
      follower: true,
    },
  });
  return follow;
};
export const unfollowUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if(!otherUser){
      throw new Error('User not found')
    }
    if(otherUser.id=== self.id){
      throw new Error('Cannot unfollow yourself')
    }
    const alreadyFollowing = await db.follow.findFirst({
      where:{
        followedId:self.id,
        followingId:otherUser.id
      }
    })
     if(!alreadyFollowing){
      throw new Error('Not following')
     }
     const unfollow = await db.follow.delete({
      where: {
        id:alreadyFollowing.id
      },
      include:{
        following:true,
        follower:true
      }
     })
     return unfollow;
  } catch  {
    throw new Error('Internal server error unfollow ')
  }
};
