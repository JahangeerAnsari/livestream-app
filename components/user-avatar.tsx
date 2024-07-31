import { cva , VariantProps} from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import LiveBadge from "./live-badge";

// lets define the size of avatar
const avatarSize = cva("",{
 variants:{
  size:{
   default:"h-8 w-8",
   lg:'h-14 w-14'
  }
 }, 
 defaultVariants:{
  size:'default'
 }
})
// we have extend the  UserAvatarProps  to use the avatarSize
// now i can access directly to the size and defaultVariants from the avatarSize
interface UserAvatarProps extends VariantProps<typeof avatarSize> {
 imageUrl: string;
 username: string;
 isLive?: boolean;
 showBadge?: boolean;
}
const UserAvatar = ({imageUrl, username, isLive, showBadge, size}:UserAvatarProps) => {
 const canShowBadge = showBadge && isLive ;

 
 return (  
  <div className="relative">
   <Avatar className={cn(isLive && 'ring-2 ring-rose-400 border border-background',
    avatarSize({size})
   )}>
     <AvatarImage src={imageUrl} className="object-cover"/>
     <AvatarFallback>
      {username[0].toLocaleUpperCase()}
      {username[username.length - 1].toLocaleUpperCase()}
     </AvatarFallback>
   </Avatar>
   {canShowBadge && (
    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/4">
    <LiveBadge/>
    </div>
   )}
  </div>
 );
}
 
export default UserAvatar;
interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSize>{};
export const UserAvatarSkeleton = ({size}:UserAvatarSkeletonProps) =>{
 return(
  <Skeleton className={cn('rounded-full',avatarSize({size}))}/>
 )
}