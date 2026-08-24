import { NextResponse } from "next/server";

export async function GET() {
  const googleAuthUrl ="https://accounts.google.com/o/oauth2/v2/auth";

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri:
    "https://task-management-system-using-next-j.vercel.app/api/auth/google/callback",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });
  return NextResponse.redirect(
    `${googleAuthUrl}?${params.toString()}`
  );
}
