import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "View transaction",
          action: "link",
          target: `https://testnet.axelarscan.io/gmp/${body?.untrustedData?.transactionId}`,
        },
      ],
      image:
        "https://token-migrate-frame-with-its.vercel.app/images/img-12.png",
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
