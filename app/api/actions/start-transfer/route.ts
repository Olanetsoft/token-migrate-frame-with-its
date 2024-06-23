import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Start Transfer Frame");
  return new NextResponse(
    getFrameHtmlResponse({
      input: {
        text: "Enter token Address",
      },
      buttons: [
        {
          action: "tx",
          label: "Transfer",
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
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
