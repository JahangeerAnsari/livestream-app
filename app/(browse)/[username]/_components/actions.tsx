"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
// Actions allows us to do api less mutations
// means we don't need to create api for this
// this is the server actions
// exampel of server to client actions
interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}
export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  console.log("isFollowing", isFollowing);

  const handleFollowUser = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnfollowUser = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollow ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const onClick = () => {
    if (isFollowing) {
      handleUnfollowUser();
    } else {
      handleFollowUser();
    }
  };
  // we can handle loading state with useTrnasistion
  const [isPending, startTransition] = useTransition();
  return (
    <Button disabled={isPending} onClick={onClick} variant="primary">
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
