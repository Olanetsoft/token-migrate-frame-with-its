import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  // Decode the URL-encoded serialized state
  let decodedState: string;
  try {
    decodedState = decodeURIComponent(body.untrustedData.state);
  } catch (error) {
    console.error("Error decoding state:", error);
    return NextResponse.json(
      { error: "Invalid state format" },
      { status: 400 }
    );
  }

  // Parse the decoded state
  let parsedState: { tokenAddress: string };
  try {
    parsedState = JSON.parse(decodedState);
  } catch (error) {
    console.error("Error parsing serialized state:", error);
    return NextResponse.json(
      { error: "Invalid serialized state" },
      { status: 400 }
    );
  }

  const { tokenAddress } = parsedState;

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "View transaction",
          action: "link",
          target: `https://testnet.axelarscan.io/gmp/${body?.untrustedData?.transactionId}`,
        },
        {
          label: "Bridge Token",
          action: "post",
          target:
            "https://token-migrate-frame-with-its.vercel.app/api/actions/request-tokenid",
        },
      ],
      image:
        "https://token-migrate-frame-with-its.vercel.app/images/img-07.png",
      postUrl:
        "https://token-migrate-frame-with-its.vercel.app/api/actions/request-tokenid",
      state: {
        tokenAddress: tokenAddress,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
