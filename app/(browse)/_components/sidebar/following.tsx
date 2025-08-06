"use client";

import { useSidebar } from "@/store/user-sidebar";
import { Follow, User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./user-item";

interface FollowingUserProps {
  data: (Follow & { following: User })[];
}
const Following = ({ data }: FollowingUserProps) => {
  const { collapsed } = useSidebar((state) => state);
  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
     {data.map((follow) =>(
      <UserItem
      key={follow.following.id}
      username={follow.following.username}
      imageUrl={follow.following.imageUrl}
     
      />
     ))}
      </ul>
    </div>
  );
};

export default Following;
export const FollowingSkeleton =() =>{
 return(
  <ul className="px-2 pt-2 lg:pt-0">
 {[...Array(3)].map((_, i) =>(
  <UserItemSkeleton key={i}/>
 ))}
  </ul>
 )
}
