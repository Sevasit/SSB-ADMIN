export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/", "/employee", "/employee/:path*", "/dashboard", "/type"],
};
