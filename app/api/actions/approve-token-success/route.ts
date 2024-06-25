import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log("Approve token Success Frame");

  const receiverAddress = body.untrustedData.inputText;
  console.log("Receiver Address:", receiverAddress);

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
  let parsedState: { tokenAddress: string; tokenId: string; amount: string };
  try {
    parsedState = JSON.parse(decodedState);
  } catch (error) {
    console.error("Error parsing serialized state:", error);
    return NextResponse.json(
      { error: "Invalid serialized state" },
      { status: 400 }
    );
  }

  const { tokenAddress, tokenId, amount } = parsedState;

  if (!/^0x[0-9a-fA-F]{40}$/.test(tokenAddress)) {
    console.error("Invalid token address format:", tokenAddress);
    return NextResponse.json(
      { error: "Invalid token address format" },
      { status: 400 }
    );
  }

  console.log("tokenAddress", tokenAddress);
  console.log("tokenId", tokenId);
  console.log("Amount", amount);

  console.log("Start Approve Frame");

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "View transaction",
          action: "link",
          target: `https://sepolia.basescan.org/tx/${body?.untrustedData?.transactionId}`,
        },
        {
          label: "Transfer",
          action: "tx",
          target:
            "https://token-migrate-frame-with-its.vercel.app/api/actions/transfer-token",
          postUrl:
            "https://token-migrate-frame-with-its.vercel.app/api/actions/transfer-token-success",
        },
      ],
      image:
        "https://token-migrate-frame-with-its.vercel.app/images/result.png",
      postUrl:
        "https://token-migrate-frame-with-its.vercel.app/api/actions/transfer-token",
      state: {
        tokenAddress: tokenAddress,
        tokenId: tokenId,
        amount: amount,
        receiverAddress: receiverAddress,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
