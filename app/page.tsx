import Image from "next/image";
import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";

const appInfo = {
  name: "Migrate Token with Interchain Token Service on Farcaster Frames",
  description:
    "Build a Farcaster frame to Migrate Token with Interchain Token Service",
  image: "https://token-migrate-frame-with-its.vercel.app/images/img-01.png",
  postUrl: "https://token-migrate-frame-with-its.vercel.app/api/home",
};

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Get Started",
    },
  ],
  image: appInfo.image,
  postUrl: appInfo.postUrl,
});

export const metadata: Metadata = {
  title: appInfo.name,
  description: appInfo.description,
  openGraph: {
    title: appInfo.name,
    description: appInfo.description,
    images: [
      {
        url: appInfo.image,
        width: 1200,
        height: 630,
        alt: appInfo.name,
      },
    ],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">
          Migrate Token with Interchain Token Service on Farcaster Frames
        </h1>
      </div>
    </main>
  );
}
