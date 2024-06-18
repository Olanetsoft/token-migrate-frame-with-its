import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
      input: {
        text: "Enter token Address",
      },
      buttons: [
        {
          action: "post",
          label: "Submit",
          target:
            "https://token-migrate-frame-with-its.vercel.app/api/middleware/select-chain",
        },
      ],
      image:
        "https://token-migrate-frame-with-its.vercel.app/images/result.png",
      postUrl:
        "https://token-migrate-frame-with-its.vercel.app/api/middleware/select-chain",
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
