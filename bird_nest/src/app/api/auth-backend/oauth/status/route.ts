import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const oauthProcessing = cookieStore.get("oauth_processing")?.value;
  const accessToken = cookieStore.get("access_token")?.value;

  return NextResponse.json({
    oauthProcessing: oauthProcessing === "true",
    hasAccessToken: !!accessToken,
  });
}
