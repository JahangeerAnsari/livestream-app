import { cn } from "@/lib/utils";

interface LiveBadgeProps{
 className?: string;
}
const LiveBadge = ({className}:LiveBadgeProps) => {

 return ( 
  <div className={cn('bg-rose-400 text-center p-0.2 px-1.5 rounder-md rounded uppercase text-[10px] border  border-background font-semibold', className)}>
     Live
  </div>
  );
}
 
export default LiveBadge;