import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log("Start Transfer: Amount Frame");

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
  let parsedState: { tokenAddress: string; tokenId: string };
  try {
    parsedState = JSON.parse(decodedState);
  } catch (error) {
    console.error("Error parsing serialized state:", error);
    return NextResponse.json(
      { error: "Invalid serialized state" },
      { status: 400 }
    );
  }

  const { tokenAddress, tokenId } = parsedState;

  if (!/^0x[0-9a-fA-F]{40}$/.test(tokenAddress)) {
    console.error("Invalid token address format:", tokenAddress);
    return NextResponse.json(
      { error: "Invalid token address format" },
      { status: 400 }
    );
  }

  console.log("tokenAddress", tokenAddress);
  console.log("tokenId", tokenId);

  console.log("Start Transfer Frame");
  return new NextResponse(
    getFrameHtmlResponse({
      input: {
        text: "Enter amount to be transfer",
      },
      buttons: [
        {
          action: "post",
          label: "Next >>",
          target:
            "https://token-migrate-frame-with-its.vercel.app/api/actions/start-transfer/receiver",
        },
      ],
      image:
        "https://token-migrate-frame-with-its.vercel.app/images/result.png",
      postUrl:
        "https://token-migrate-frame-with-its.vercel.app/api/actions/start-transfer/receiver",
      state: {
        tokenAddress: tokenAddress,
        tokenId: tokenId,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
