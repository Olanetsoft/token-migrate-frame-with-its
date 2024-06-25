import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Select a deploy chain screen");

  const body: FrameRequest = await req.json();
  console.log("Start deployment Frame");

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
          action: "post",
          label: "Ethereum",
        },
        {
          action: "post",
          label: "Optimism",
        },
        {
          action: "post",
          label: "Base",
        },
      ],
      image:
        "https://token-migrate-frame-with-its.vercel.app/images/img-03.png",
      postUrl:
        "https://token-migrate-frame-with-its.vercel.app/api/middleware/deploy-verifier",
      state: {
        tokenAddress: tokenAddress,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
