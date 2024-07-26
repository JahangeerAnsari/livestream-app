import { cn } from "@/lib/utils";
// cn for dynamic class 
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 
        mr-12 shrink-0 lg:mr-0 lg:shrink-0
        ">
          <Image
          src="/animal.png"
          width="32"
          height="32"
          alt="bird"
          />
        </div>
        <div className={cn(
          "hidden lg:block",
          font.className
          )}>
             <p className="text-lg font-semibold">
               GameHub
             </p>
             <p className="text-xs text-muted-foreground">
               let&apos;s play
             </p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
