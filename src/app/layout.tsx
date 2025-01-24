import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { amelecoFileRouter } from "~/app/api/uploadthing/core";
import { TRPCReactProvider } from "~/trpc/react";
import { Footer } from "~/app/_components/shared/Footer";
import Header from "~/app/_components/shared/Header";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(amelecoFileRouter)}
        />
        <TRPCReactProvider>
          <Header />
          {children}
          <Footer />
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
