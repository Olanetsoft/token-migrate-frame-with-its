import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  try {
    console.log("Verifier Screen");

    const body = await req.json();
    console.log(body);

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

    return NextResponse.json(
      getFrameHtmlResponse({
        buttons: [
          {
            action: "tx",
            label: "Register",
            target: "http://localhost:3000/actions/register-token",
            postUrl: "http://localhost:3000/api/actions/register-token-success",
          },
        ],
        image: "http://localhost:3000/images/result.png",
        postUrl: "http://localhost:3000/actions/register-token",
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
