import { authMiddleware, clerkMiddleware,  } from "@clerk/nextjs/server";

export default clerkMiddleware({});
authMiddleware({
  publicRoutes:[
    "/",
    "/api/webhooks(.*)",
  ]
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};