import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    let chainName: string | undefined;
    switch (body.untrustedData.buttonIndex) {
      case 1:
        chainName = "ethereum-sepolia";
        break;
      case 2:
        chainName = "optimism-sepolia";
        break;
      case 3:
        chainName = "base-sepolia";
        break;
      default:
        return NextResponse.json(
          { error: "Invalid button index" },
          { status: 400 }
        );
    }

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
            action: "tx",
            label: "Deploy",
            target:
              "https://token-migrate-frame-with-its.vercel.app/api/actions/deploy-token",
            postUrl:
              "https://token-migrate-frame-with-its.vercel.app/api/actions/deploy-token-success",
          },
        ],
        image:
          "https://token-migrate-frame-with-its.vercel.app/images/img-05.png",
        postUrl:
          "https://token-migrate-frame-with-its.vercel.app/api/actions/deploy-token",
        state: {
          chain: chainName,
          tokenAddress: tokenAddress,
        },
      })
    );
  } catch (error) {
    console.error("Error in getResponse:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
