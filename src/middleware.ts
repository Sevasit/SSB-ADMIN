export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/",
    "/employee",
    "/employee/:path*",
    "/dashboard",
    "/type",
    "/approve",
    "/approve/:path*",
    "/completed",
    "/completed/:path*",
    "/task",
    "/task/:path*",
  ],
};
