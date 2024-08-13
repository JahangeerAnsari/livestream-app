
// [username] --> inside this is the dynamic part of url

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

// we can access the dynamic here
interface UserPageProps{
 params:{
  username:string
 }
}
const UserPage = async ({params}:UserPageProps) => {
 const user = await getUserByUsername(params.username);
 if(!user){
  notFound()
 }
 const isFollowing = await isFollowingUser(user.id)
  return <div>
   User name :{user.username}
   User id :{user.id}
   <p>{JSON.stringify(isFollowing)}</p>
  </div>;
};

export default UserPage;
