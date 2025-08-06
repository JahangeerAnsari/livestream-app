"use server";
import { followUser, unfollowUser } from "@/lib/follow-service";
// we can validate the path
import { revalidatePath } from "next/cache";
export const onFollow = async (id:string) =>{
try {
 const followedUser = await followUser(id)
 revalidatePath("/")
   if(followedUser){
    // if it follow the user the show his name
    revalidatePath(`/${followedUser.following.username}`)
   }
   return followedUser
} catch (error) {
 throw new Error("Internal error: " + error)
 
}
}
export const onUnfollow =async (id:string) =>{
 try {
  const unfollow = await unfollowUser(id);
   revalidatePath("/");
   if(unfollow){
    revalidatePath(`/${unfollow.following.username}`)
   }
   return unfollow;
 } catch (error) {
  throw new Error("Internal error:onUnfollow " + error)
 }
}