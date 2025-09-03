import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const authParams = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
       });

    return NextResponse.json({
      token: authParams.token,
      signature: authParams.signature,
      expire: authParams.expire,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY

    });
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
