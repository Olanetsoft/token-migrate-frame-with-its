import { Input } from "@ethereumjs/rlp/src";
import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Select a chain screen");

  const body = await req.json();
  console.log(body);

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
        "https://token-migrate-frame-with-its.vercel.app/images/result.png",
      postUrl:
        "https://token-migrate-frame-with-its.vercel.app/api/middleware/register-verifier",
      state: {
        tokenAddress: body.untrustedData.inputText,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
