import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionToken = req.cookies.get("authjs.session-token");
  const isLoggedIn = Boolean(sessionToken);

  const publicRoutes = ["/"];
  const authRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/verify-account"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (authRoutes.includes(pathname)) {
    if (isLoggedIn) {
      console.log("Redirecting to /conversations");
      return NextResponse.redirect(new URL("/conversations", req.url));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    console.log("Redirecting to /auth/sign-in");
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};