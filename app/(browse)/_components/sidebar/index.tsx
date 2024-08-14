import { getRecommended } from "@/lib/recommended-service";
import Recommended, { RecommendedSkeleton } from "./recommended";
import Toggle, { ToggleSkeleton } from "./toggle";
import Wrapper from "./wrapper";
import { getFollowingUsers } from "@/lib/follow-service";
import Following, { FollowingSkeleton } from "./following";

const Sidebar = async () => {
  // in return we are going to pass server-component inside client-component in wrapper
  const recommended = await getRecommended();
  const following = await getFollowingUsers();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;
{
  /* <Wrapper>
kuch v likjenge wrapper me show hoga because its child wrapper
</Wrapper> */
}

export const SidebarSkeleton = () => {
  return (
    <aside
      className="left-0 flex flex-col w-[70px] lg:w-60
    h-full bg-background border-r border-[#2D2E35] z-50"
    >
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
