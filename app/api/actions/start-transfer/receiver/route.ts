import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log("Start Transfer: Receiver Frame");

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
        text: "Enter receiver address",
      },
      buttons: [
        {
          action: "tx",
          label: "Approve",
          target:
            "https://token-migrate-frame-with-its.vercel.app/api/actions/approve-token",
          postUrl:
            "https://token-migrate-frame-with-its.vercel.app/api/actions/approve-token-success",
        },
      ],
      image:
        "https://token-migrate-frame-with-its.vercel.app/images/img-10.png",
      postUrl:
        "https://token-migrate-frame-with-its.vercel.app/api/actions/approve-token",
      state: {
        tokenAddress: tokenAddress,
        tokenId: tokenId,
        amount: body.untrustedData.inputText,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
