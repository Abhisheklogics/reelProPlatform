"use client";

import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";

const url = process.env.NEXT_PUBLIC_URL_END_POINT;

export default function Providers({ children }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ImageKitProvider urlEndpoint={url}>
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
