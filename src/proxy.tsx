import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = [
    "/dashboard",
    "/task",
    "/profile",
    "/calender",
    "/categories",
    "/settingPage",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If protected route and no token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/task/:path*",
    "/profile/:path*",
    "/calender/:path*",
    "/categories/:path*",
    "/settingPage/:path*",
  ],
};