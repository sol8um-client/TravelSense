import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes with basic password auth
  if (pathname.startsWith("/admin")) {
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      // No password set — allow access in development
      return NextResponse.next()
    }

    const authCookie = request.cookies.get("admin_auth")
    if (authCookie?.value === adminPassword) {
      return NextResponse.next()
    }

    // Check for password in query param (simple login mechanism)
    const passwordParam = request.nextUrl.searchParams.get("password")
    if (passwordParam === adminPassword) {
      const response = NextResponse.redirect(
        new URL(pathname, request.url)
      )
      response.cookies.set("admin_auth", adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      return response
    }

    // Return 401 with a simple login form
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Admin Login — TravelSense</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0A1425;font-family:system-ui,sans-serif;color:#fff}
  .card{background:#0D1A30;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:40px;max-width:400px;width:90%;text-align:center}
  h1{font-size:1.5rem;margin:0 0 8px}
  p{color:rgba(255,255,255,0.5);font-size:0.875rem;margin:0 0 24px}
  input{width:100%;padding:12px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:1rem;margin-bottom:16px;box-sizing:border-box}
  input:focus{outline:none;border-color:#C4324A}
  button{width:100%;padding:12px;background:#C4324A;color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer}
  button:hover{background:#a82a3e}
</style></head>
<body>
<div class="card">
  <h1>Admin Access</h1>
  <p>Enter the admin password to continue</p>
  <form method="GET">
    <input type="password" name="password" placeholder="Password" required autofocus />
    <button type="submit">Login</button>
  </form>
</div>
</body></html>`,
      { status: 401, headers: { "Content-Type": "text/html" } }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
