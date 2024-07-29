"use client";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/user-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";
  
  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label={label}  side="right" asChild>
          <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
            <ArrowRightFromLine className="h-4 w-4" />
          </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p>For You</p>
          <Hint label={label} side="right" asChild>
          <Button
            onClick={onCollapse}
            className="h-auto p-2 ml-auto"
            variant="ghost"
          >
            <ArrowLeftFromLine />
          </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;
