import { cn } from "@/lib/utils";
// cn for dynamic class 
import { Poppins } from "next/font/google";
import Image from "next/image";
const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image src="/animal.png" alt="gamehub" height="80" width="80" />
      </div>
      <div className={cn("flex flex-col items-center",font.className)}>
        <p className="text-xl font-semibold">GameHub</p>
        <p className="text-sm text-muted-foreground">Lets Play</p>
      </div>
    </div>
  );
};

export default Logo;
