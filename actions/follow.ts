"use server";
import { followUser } from "@/lib/follow-service";
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